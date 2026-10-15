#!/usr/bin/env python3
"""TEKOÄLYPINTA (Karttaseppä 9.10.2026, PT: omistaja hyväksyi tekoälypintojen kokeen; LR:n työkalu).
Syvyys + reunat (+ viitekuva tyyliksi) sisään → kuva ulos. ComfyUI (T7, MPS) + SDXL base 1.0 + xinsir ControlNet union promax
(depth ja canny samassa mallissa) + IP-Adapter plus SDXL ViT-H. Lisenssit: LAHTEET.md.

Käyttö (mikä tahansa python3, ei riippuvuuksia; ComfyUI käynnistyy tarvittaessa taustalle porttiin 8189):
  python3 pinta.py --syvyys syv.png [--reunat reunat.png | --reunat-kuvasta renderi.png] [--viite tyyli.jpg]
                   --kehote "medieval stone castle courtyard, ..." [--kielto "..."] --ulos tulos.png
                   [--leveys 1024 --korkeus 1024] [--askeleet 28] [--cfg 6] [--siemen 1]
                   [--syvyys-voima 0.7] [--reunat-voima 0.5] [--viite-voima 0.6] [--viite-tapa "style transfer"]
Syvyys: lähellä vaalea (MiDaS-tapa). Reunat: valkoiset viivat mustalla; --reunat-kuvasta laskee Cannyn renderistä.
"""
import argparse, json, os, subprocess, sys, time, uuid, urllib.request, urllib.parse
JUURI = os.path.dirname(os.path.abspath(__file__))
COMFY, PY, OSOITE = os.path.join(JUURI, 'ComfyUI'), os.path.join(JUURI, 'venv', 'bin', 'python'), 'http://127.0.0.1:8189'

def pyynto(polku, data=None, tyyppi='application/json'):
    req = urllib.request.Request(OSOITE + polku, data=data, headers={'Content-Type': tyyppi} if data else {})
    with urllib.request.urlopen(req, timeout=60) as r: return r.read()

def kaynnissa():
    try: pyynto('/system_stats'); return True
    except Exception: return False

def kaynnista():
    if kaynnissa(): return
    loki = open(os.path.join(JUURI, 'comfyui.log'), 'a')
    ymp = dict(os.environ, HF_HOME=os.path.join(JUURI, 'valimuisti', 'hf'), TORCH_HOME=os.path.join(JUURI, 'valimuisti', 'torch'), PIP_CACHE_DIR=os.path.join(JUURI, 'valimuisti', 'pip'), TMPDIR=os.path.join(JUURI, 'valimuisti', 'tmp'))   # PT: käynnistyslevy ei täyty
    os.makedirs(ymp['TMPDIR'], exist_ok=True)
    subprocess.Popen([PY, 'main.py', '--listen', '127.0.0.1', '--port', '8189', '--disable-auto-launch', '--force-fp16', '--temp-directory', ymp['TMPDIR']], cwd=COMFY, stdout=loki, stderr=loki, start_new_session=True, env=ymp)
    for _ in range(180):
        if kaynnissa(): return
        time.sleep(1)
    sys.exit('ComfyUI ei käynnistynyt (ks. comfyui.log)')

def laheta(polku):
    raja = uuid.uuid4().hex; nimi = os.path.basename(polku)
    runko = (f'--{raja}\r\nContent-Disposition: form-data; name="image"; filename="{nimi}"\r\nContent-Type: application/octet-stream\r\n\r\n').encode() + open(polku, 'rb').read() + \
            (f'\r\n--{raja}\r\nContent-Disposition: form-data; name="overwrite"\r\n\r\ntrue\r\n--{raja}--\r\n').encode()
    return json.loads(pyynto('/upload/image', runko, f'multipart/form-data; boundary={raja}'))['name']

def tyonkulku(a, syv, reu, reu_kuvasta, viite):
    g = {
        '1': {'class_type': 'CheckpointLoaderSimple', 'inputs': {'ckpt_name': 'sd_xl_base_1.0.safetensors'}},
        '2': {'class_type': 'VAELoader', 'inputs': {'vae_name': 'sdxl-vae-fp16-fix.safetensors'}},
        '3': {'class_type': 'CLIPTextEncode', 'inputs': {'text': a.kehote, 'clip': ['1', 1]}},
        '4': {'class_type': 'CLIPTextEncode', 'inputs': {'text': a.kielto, 'clip': ['1', 1]}},
        '5': {'class_type': 'ControlNetLoader', 'inputs': {'control_net_name': 'controlnet-union-sdxl-1.0-promax.safetensors'}},
        '6': {'class_type': 'SetUnionControlNetType', 'inputs': {'control_net': ['5', 0], 'type': 'depth'}},
        '7': {'class_type': 'SetUnionControlNetType', 'inputs': {'control_net': ['5', 0], 'type': 'canny/lineart/anime_lineart/mlsd'}},
        '8': {'class_type': 'LoadImage', 'inputs': {'image': syv}},
        '10': {'class_type': 'ControlNetApplyAdvanced', 'inputs': {'positive': ['3', 0], 'negative': ['4', 0], 'control_net': ['6', 0], 'image': ['8', 0],
              'strength': a.syvyys_voima, 'start_percent': 0.0, 'end_percent': 0.9, 'vae': ['2', 0]}},
        '13': {'class_type': 'EmptyLatentImage', 'inputs': {'width': a.leveys, 'height': a.korkeus, 'batch_size': 1}},
        '15': {'class_type': 'VAEDecode', 'inputs': {'samples': ['14', 0], 'vae': ['2', 0]}},
        '16': {'class_type': 'SaveImage', 'inputs': {'images': ['15', 0], 'filename_prefix': 'pinta'}},
    }
    pos, neg, malli = ['10', 0], ['10', 1], ['1', 0]
    if reu or reu_kuvasta:
        g['9'] = {'class_type': 'LoadImage', 'inputs': {'image': reu or reu_kuvasta}}
        kuva = ['9', 0]
        if reu_kuvasta: g['9b'] = {'class_type': 'Canny', 'inputs': {'image': ['9', 0], 'low_threshold': 0.3, 'high_threshold': 0.7}}; kuva = ['9b', 0]
        g['11'] = {'class_type': 'ControlNetApplyAdvanced', 'inputs': {'positive': ['10', 0], 'negative': ['10', 1], 'control_net': ['7', 0], 'image': kuva,
                   'strength': a.reunat_voima, 'start_percent': 0.0, 'end_percent': a.reunat_loppu, 'vae': ['2', 0]}}
        pos, neg = ['11', 0], ['11', 1]
    if getattr(a, 'tile_n', None):
        g['21'] = {'class_type': 'SetUnionControlNetType', 'inputs': {'control_net': ['5', 0], 'type': 'tile'}}
        g['22'] = {'class_type': 'LoadImage', 'inputs': {'image': a.tile_n}}
        g['23'] = {'class_type': 'ControlNetApplyAdvanced', 'inputs': {'positive': pos, 'negative': neg, 'control_net': ['21', 0], 'image': ['22', 0],
                   'strength': a.tile_voima, 'start_percent': 0.0, 'end_percent': 0.8, 'vae': ['2', 0]}}
        pos, neg = ['23', 0], ['23', 1]
    latentti = ['13', 0]
    if getattr(a, 'pohja_n', None):
        g['24'] = {'class_type': 'LoadImage', 'inputs': {'image': a.pohja_n}}
        g['25'] = {'class_type': 'ImageScale', 'inputs': {'image': ['24', 0], 'upscale_method': 'lanczos', 'width': a.leveys, 'height': a.korkeus, 'crop': 'center'}}
        g['26'] = {'class_type': 'VAEEncode', 'inputs': {'pixels': ['25', 0], 'vae': ['2', 0]}}
        latentti = ['26', 0]
    if viite:
        g['17'] = {'class_type': 'IPAdapterModelLoader', 'inputs': {'ipadapter_file': 'ip-adapter-plus_sdxl_vit-h.safetensors'}}
        g['18'] = {'class_type': 'CLIPVisionLoader', 'inputs': {'clip_name': 'CLIP-ViT-H-14-laion2B-s32B-b79K.safetensors'}}
        g['19'] = {'class_type': 'LoadImage', 'inputs': {'image': viite}}
        g['20'] = {'class_type': 'IPAdapterAdvanced', 'inputs': {'model': ['1', 0], 'ipadapter': ['17', 0], 'image': ['19', 0], 'weight': a.viite_voima,
                   'weight_type': a.viite_tapa, 'combine_embeds': 'concat', 'start_at': 0.0, 'end_at': 1.0, 'embeds_scaling': 'V only', 'clip_vision': ['18', 0]}}
        malli = ['20', 0]
    g['14'] = {'class_type': 'KSampler', 'inputs': {'model': malli, 'positive': pos, 'negative': neg, 'latent_image': latentti, 'seed': a.siemen,
               'steps': a.askeleet, 'cfg': a.cfg, 'sampler_name': 'dpmpp_2m', 'scheduler': 'karras', 'denoise': a.denoise}}
    return g

def main():
    p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    p.add_argument('--syvyys', required=True); p.add_argument('--reunat'); p.add_argument('--reunat-kuvasta'); p.add_argument('--viite')
    p.add_argument('--kehote', required=True); p.add_argument('--kielto', default='blurry, lowres, text, watermark, cartoon, deformed, people')
    p.add_argument('--ulos', required=True); p.add_argument('--leveys', type=int, default=1024); p.add_argument('--korkeus', type=int, default=1024)
    p.add_argument('--askeleet', type=int, default=28); p.add_argument('--cfg', type=float, default=6.0); p.add_argument('--siemen', type=int, default=1)
    p.add_argument('--syvyys-voima', type=float, default=0.7); p.add_argument('--reunat-voima', type=float, default=0.5)
    p.add_argument('--viite-voima', type=float, default=0.6); p.add_argument('--viite-tapa', default='style transfer')
    p.add_argument('--reunat-loppu', type=float, default=0.75, help='reunaohjauksen loppu (0–1); 1.0 = koko generointi')
    p.add_argument('--pohja', help='img2img: renderi pohjakuvaksi (rakenne lukkoon), käytä --denoise 0.55–0.7')
    p.add_argument('--denoise', type=float, default=1.0)
    p.add_argument('--tile', help='union tile -ohjaus kuvasta (yleensä renderi): ikkunaruudukko ja mittasuhteet')
    p.add_argument('--tile-voima', type=float, default=0.5)
    p.add_argument('--valaistus', choices=['pilvinen', 'ei'], default='pilvinen', help='pilvinen: tasainen valo, ei leivottuja varjoja eikä kiiltoja (peli valaisee itse)')
    a = p.parse_args()
    if a.valaistus == 'pilvinen':
        a.kehote += ', overcast sky, soft diffuse even lighting, no cast shadows, matte surfaces'
        a.kielto += ', harsh shadows, direct sunlight, cast shadows, specular highlights, glare, reflections, lens flare, night'
    kaynnista(); t0 = time.time()
    syv = laheta(a.syvyys); reu = laheta(a.reunat) if a.reunat else None; reuk = laheta(a.reunat_kuvasta) if a.reunat_kuvasta else None
    vii = laheta(a.viite) if a.viite else None
    a.pohja_n = laheta(a.pohja) if a.pohja else None; a.tile_n = laheta(a.tile) if a.tile else None
    pid = json.loads(pyynto('/prompt', json.dumps({'prompt': tyonkulku(a, syv, reu, reuk, vii), 'client_id': 'pinta'}).encode()))['prompt_id']
    while True:
        h = json.loads(pyynto(f'/history/{pid}'))
        if pid in h:
            st = h[pid].get('status', {})
            if st.get('status_str') == 'error': sys.exit('VIRHE: ' + json.dumps(st.get('messages', [])[-1:], ensure_ascii=False)[:800])
            outs = h[pid].get('outputs', {}).get('16', {}).get('images', [])
            if outs:
                o = outs[0]; q = urllib.parse.urlencode({'filename': o['filename'], 'subfolder': o['subfolder'], 'type': o['type']})
                open(a.ulos, 'wb').write(pyynto('/view?' + q)); break
        time.sleep(1)
    print(json.dumps({'ulos': a.ulos, 'sekuntia': round(time.time() - t0, 1), 'koko': [a.leveys, a.korkeus], 'askeleet': a.askeleet}, ensure_ascii=False))

if __name__ == '__main__':
    main()
