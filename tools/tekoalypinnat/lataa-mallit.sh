#!/bin/zsh
# Karttaseppä 9.10.: tekoälypintojen mallit (vain safetensors, lisenssit LAHTEET.md:ssä)
M="/Volumes/T7 4TB/Matkakirja-karttaseppa/tekoalypinnat/ComfyUI/models"; H=https://huggingface.co
l() { curl -sfL --retry 5 -C - -o "$1" "$2" && echo "OK $(basename "$1") $(stat -f %z "$1")" || echo "VIRHE $1"; }
l "$M/checkpoints/sd_xl_base_1.0.safetensors" "$H/stabilityai/stable-diffusion-xl-base-1.0/resolve/main/sd_xl_base_1.0.safetensors" &
l "$M/controlnet/controlnet-union-sdxl-1.0-promax.safetensors" "$H/xinsir/controlnet-union-sdxl-1.0/resolve/main/diffusion_pytorch_model_promax.safetensors" &
l "$M/ipadapter/ip-adapter-plus_sdxl_vit-h.safetensors" "$H/h94/IP-Adapter/resolve/main/sdxl_models/ip-adapter-plus_sdxl_vit-h.safetensors" &
l "$M/clip_vision/CLIP-ViT-H-14-laion2B-s32B-b79K.safetensors" "$H/h94/IP-Adapter/resolve/main/models/image_encoder/model.safetensors" &
l "$M/vae/sdxl-vae-fp16-fix.safetensors" "$H/madebyollin/sdxl-vae-fp16-fix/resolve/main/sdxl.vae.safetensors" &
wait; echo LATAUS VALMIS
