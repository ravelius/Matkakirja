# Tekoälypinnat: LR:n työnkulku (Karttaseppä 9.10.2026)

Komento (mikä tahansa python3; ComfyUI käynnistyy tarvittaessa taustalle 127.0.0.1:8189, loki comfyui.log):

    python3 "/Volumes/T7 4TB/Matkakirja-karttaseppa/tekoalypinnat/pinta.py" \
      --syvyys syvyys16.png --reunat-kuvasta renderi.png [--reunat viivat.png] [--viite tyyli.jpg] \
      --kehote "aerial photograph of …, photorealistic" --ulos tulos.png --leveys 1360 --korkeus 768 \
      [--syvyys-voima 0.8 --reunat-voima 0.8 --siemen 2 --askeleet 28 --cfg 6 --viite-voima 0.6 --viite-tapa "style transfer"]

- Syvyys: lähellä vaalea, taivas 0. Reunat: valkoinen viiva mustalla, tai `--reunat-kuvasta` laskee Cannyn renderistä.
- Koko: SDXL toimii parhaiten noin 1 Mpx:n kokoisena (1360×768 = 16:9). Ohjauskuva skaalataan latenttiin, keskeltä rajaten.
- Aika (M4 Max, MPS, fp16): ensimmäinen kuva 114 s (mallien lataus), sen jälkeen noin 71 s / 1360×768 / 28 askelta.
- Mallit ja lisenssit: LAHTEET.md. Kaikki kaupallisesti sallittuja, vain safetensors.
- Pysäytys: ComfyUI jää taustalle. Sammutus: `kill <pid>` omasta prosessista (`lsof -i :8189`).

Koetulokset 9.10. (_tyo/karttaseppa/tekoalypinnat-koe/vertailu-*.jpg; ylhäällä renderi ja syvyys, alhaalla tulos ja tulos + renderin reunat punaisella):
- Massat, katot ja pylväiköt osuvat. Rakennusalueella 64–82 % tuloksen reunoista on ±3 px:n päässä renderin reunasta, ja renderin reunoista 68–80 % toistuu.
- Ikkunat siirtyvät osin mallin omaan ruudukkoon. Voimakkaampi reunaohjaus (0,8) auttaa. Taivas ja tausta (syvyys 0) keksitään, joten ne rajataan maskilla.
