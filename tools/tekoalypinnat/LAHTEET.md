# Tekoälypinnat: työkalut ja mallit (Karttaseppä 9.10.2026)

Omistaja hyväksyi tekoälypintojen kokeen (PT 9.10.). Kaikki on T7:llä (`/Volumes/T7 4TB/Matkakirja-karttaseppa/tekoalypinnat/`), ei käynnistyslevyllä. Mallit on ladattu vain safetensors-muodossa, ja lisenssi on tarkistettu mallisivulta ennen latausta.

| Tiedosto (ComfyUI/models/…) | Lähde | Lisenssi | Kaupallinen käyttö |
|---|---|---|---|
| checkpoints/sd_xl_base_1.0.safetensors | huggingface.co/stabilityai/stable-diffusion-xl-base-1.0 | CreativeML Open RAIL++-M | Sallittu (rojaltivapaa lisenssi; käyttörajoitukset liitteessä A, tuotoksiin lisensoija ei vaadi oikeuksia) |
| controlnet/controlnet-union-sdxl-1.0-promax.safetensors | huggingface.co/xinsir/controlnet-union-sdxl-1.0 (diffusion_pytorch_model_promax) | Apache-2.0 | Sallittu |
| ipadapter/ip-adapter-plus_sdxl_vit-h.safetensors | huggingface.co/h94/IP-Adapter (sdxl_models/) | Apache-2.0 | Sallittu |
| clip_vision/CLIP-ViT-H-14-laion2B-s32B-b79K.safetensors | huggingface.co/h94/IP-Adapter (models/image_encoder/model.safetensors, OpenCLIP ViT-H-14) | Apache-2.0 (h94); OpenCLIP-painot MIT | Sallittu |
| vae/sdxl-vae-fp16-fix.safetensors | huggingface.co/madebyollin/sdxl-vae-fp16-fix | MIT | Sallittu |

Ei ladattu: FLUX.1-dev (ei-kaupallinen lisenssi), Hunyuan (alueraja ja ehdot), .bin- eli pickle-tiedostot.

## Työkalut (eivät mene peliin)

- ComfyUI (github.com/comfyanonymous/ComfyUI), GPL-3.0. Commit kirjattu `ComfyUI/`-kansion gitiin.
- ComfyUI_IPAdapter_plus (github.com/cubiq/ComfyUI_IPAdapter_plus), GPL-3.0, commit a0f451a (huhtikuu 2025, ylläpito päättynyt mutta toimii).
- PyTorch 2.14.1 (BSD), Python 3.14 venv `venv/`, MPS (Apple M4 Max).

GPL koskee vain työkaluja. Tuotetut kuvat eivät ole työkalujen johdannaisia, ja niihin sovelletaan mallien lisenssejä (RAIL++-M:n käyttörajoitukset).
