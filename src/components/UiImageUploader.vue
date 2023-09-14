<template>
  <div class="image-uploader">
    <label 
    class="image-uploader__preview"
    :class="{'image-uploader__preview-loading': loading}"
    :style="selectedImage && `--bg-url: url(${selectedImage})`"
    @click="removeImage"
     >
      <span class="image-uploader__text">
        {{ !loading && !selectedImage ? 'Загрузить изображение' : 
        loading ? 'Загрузка...' : 'Удалить изображение' }}
      </span>
      <input 
      v-bind="$attrs"
      ref="fileInput"
      type="file" 
      accept="image/*" 
      class="image-uploader__input" 
      @change="handleFileChange"
      />
    </label>
  </div>
</template>

<script>
export default {
  name: 'UiImageUploader',

  inheritAttrs: false,

  props: {
     preview: String,
     uploader: Function,
  },

  data() {
    return {
      selectedImage: this.preview || '',
      loading: false,
    }
  },

  emits: ['upload', 'error', 'select', 'remove'],

  methods: {

    handleFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.loading = true;
        this.uploadFile(file);
      }
    },

    async uploadFile(file) {
      if (this.uploader) {
        try {
          const uploadResult = await this.uploader(file);
          this.selectedImage = URL.createObjectURL(file);
          this.$emit('upload', uploadResult);
        } catch (error) {
          this.$emit('error', error);
          this.selectedImage = '';
          this.$refs.fileInput.value = '';
        } finally {
          this.loading = false;
        }
      } else {
        this.selectedImage = URL.createObjectURL(file);
        this.loading = false;
      }
      this.$emit('select', file);
    },

    removeImage(event) {
      if (this.selectedImage) {
        event.preventDefault();
        URL.revokeObjectURL(this.selectedImage);
        this.selectedImage = '';
        this.$refs.fileInput.value = '';
        this.$emit('remove');
      }
    },

  }

};
</script>

<style scoped>
/* _image-uploader.css */

.image-uploader {
}

.image-uploader__input {
  opacity: 0;
  height: 0;
}

.image-uploader__preview {
  --bg-url: var(--default-cover);
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), var(--bg-url);
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  transition: 0.2s border-color;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 512px;
  height: 228px;
}

.image-uploader__text {
  color: var(--white);
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
}

.image-uploader__preview:hover {
  border-color: var(--blue);
}

.image-uploader__preview.image-uploader__preview-loading {
  cursor: no-drop;
}
</style>
