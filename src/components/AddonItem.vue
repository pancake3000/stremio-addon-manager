<script setup>
const props = defineProps({
  name: {
    type: String,
    required: true
  },
  idx: {
    type: Number,
    required: true
  },
  manifestURL: {
    type: String,
    required: true
  },
  logoURL: {
    type: String,
    required: false
  },
  isDeletable: {
    type: Boolean,
    required: false,
    default: true
  },
  isConfigurable: {
    type: Boolean,
    required: false,
    default: false
  }
})

const emits = defineEmits(['delete-addon'])



const defaultLogo = 'https://icongr.am/feather/box.svg?size=48&color=ffffff'


function copyManifestURLToClipboard() {
  navigator.clipboard.writeText(props.manifestURL).then(() => {
    console.log('Text copied to clipboard')
  }).catch((error) => {
    console.error('Error copying text to clipboard', error)
  })
}

function openAddonConfigurationPage() {
  const configureURL = props.manifestURL.replace("stremio://", "https://").replace("/manifest.json", "/configure");
  window.open(configureURL);
}

function removeAddon() {
  emits('delete-addon', props.idx)
}

</script>

<template>
  <div class="item">
    <div class="col-8">
      <div class="details">
        <div class="logo_container">
          <img :src="logoURL || defaultLogo" />
        </div>
        <span>{{ name }}</span>
      </div>
    </div>
    <div class="col">
      <button class="button icon-only visit-url" title="Open addon configuration page in new window"
        :disabled="!isConfigurable" @click="openAddonConfigurationPage">
        <img src="https://icongr.am/feather/arrow-up-right.svg?size=12">
      </button>
      <button class="button icon-only copy-url" title="Copy addon manifest URL to clipboard"
        @click="copyManifestURLToClipboard">
        <img src="https://icongr.am/feather/clipboard.svg?size=12">
      </button>
      <button class="button icon-only delete" title="Remove addon from list" :disabled="!isDeletable"
        @click="removeAddon">
        <img src="https://icongr.am/feather/trash-2.svg?size=12">
      </button>
    </div>
    <i class="uil uil-draggabledots"></i>
  </div>
</template>

<style scoped>
.sortable-list .item {
  list-style: none;
  display: flex;
  cursor: move;
  align-items: center;
  border-radius: 5px;
  padding: 10px 13px;
  margin-bottom: 11px;
  /* box-shadow: 0 2px 4px rgba(0,0,0,0.06); */
  border: 1px solid #ccc;
  justify-content: space-between;
}

.dark .sortable-list .item {
  border: 1px solid #434242;
}

.item .details {
  display: flex;
  align-items: center;
}

.item .details img {
  height: 60px;
  width: 60px;
  pointer-events: none;
  margin-right: 12px;
  object-fit: contain;
  object-position: center;
  border-radius: 30%;
  background-color: #262626;

}
</style>
