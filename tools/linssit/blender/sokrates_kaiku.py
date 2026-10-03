# Sokrates v8: kaikukuva projektorille (Linnanrakentaja 2.10.2026), PIL. Valoa vain sisällössä (omistaja: ei taustavuotoa).
#   python3 sokrates_kaiku.py <lähde> <ulos.png> <viiva|kuva|keski|tondo|rajattu> [x0 y0 x1 y1] x0 y0 x1 y1
# KAIKKI KAIUT POSITIIVISINA (omistaja 2.10. 11.1x). viiva: viivapiirros/kaiverrus positiivina, tummat viivat vaalealla
#        (Codexin musta viiva läpinäkyvällä taustalla yhdistetään ensin valkoiselle paperille). kuva: maalaus/valokuva,
#        tummat taustat mustaksi tasokäyrällä (sisältö jää valoksi). Molemmissa pehmeä soikea maski (ei suorakaidetta).
import sys
from PIL import Image, ImageChops, ImageDraw, ImageFilter, ImageOps

# lisäliput (4.10.): --reuna ala=0.3,oikea=0.3 (häivytysmatka osuutena lyhyemmästä sivusta, oletus ala 0,25 / muut 0,14)
#                    --musta 0.28 (mustapiste: luma alle tämän → läpinäkyvä, liuku sen yläpuolella; tumma tausta ei valaise)
LIPUT = {}
for nimi_ in ('--reuna', '--musta'):
    if nimi_ in sys.argv:
        i_ = sys.argv.index(nimi_); LIPUT[nimi_] = sys.argv[i_ + 1]; del sys.argv[i_:i_ + 2]
REUNA = {'ala': 0.25, 'yla': 0.14, 'vasen': 0.14, 'oikea': 0.14}
for kv in LIPUT.get('--reuna', '').split(','):
    if '=' in kv: REUNA[kv.split('=')[0]] = float(kv.split('=')[1])
MUSTA = float(LIPUT.get('--musta', 0))
lahde, ulos, tapa = sys.argv[1], sys.argv[2], sys.argv[3]
src = Image.open(lahde)
x0, y0, x1, y1 = map(int, sys.argv[4:8]) if len(sys.argv) >= 8 else (0, 0) + src.size
if tapa == 'rajattu':
    # v13c (omistaja 3.10. 08.0x, Zeuksen linja): rajattu hahmo ilman taustaa ja kehystä — läpinäkyvyys on maski,
    # sävyt S-käyrällä kuten keski-tilassa, ei soikiota, ei sumennusta (reuna ei hehku)
    import math as _m
    rgba = src.convert('RGBA').crop((x0, y0, x1, y1)); rgba.thumbnail((2048, 2048), Image.LANCZOS)
    alfa = rgba.getchannel('A')
    if MUSTA > 0:   # mustapiste: tumma tausta (esim. sohva) ei valaise — luma → alfa, pehmeä liuku 0,12 mustapisteen yläpuolelle
        luma = rgba.convert('L'); mp_, lv_ = MUSTA * 255, 0.12 * 255
        alfa = ImageChops.multiply(alfa, luma.point(lambda v: 0 if v <= mp_ else min(255, int(255 * ((v - mp_) / lv_) ** 1.5))))
    im = ImageOps.autocontrast(rgba.convert('L'), cutoff=1.0, mask=alfa.point(lambda v: 255 if v > 128 else 0))
    s_ = lambda x: 0.5 + 0.5 * _m.tanh(2.6 * (x - 0.5)) / _m.tanh(1.3)
    # projektorissa musta = ei valoa: alfa kerrotaan sävyyn (maski), ja hahmon sisäsävyt nostetaan välille 0,27–1,0,
    # jotta tummakin hahmo (hopliittipronssi) piirtyy valona eikä katoa varjoon
    im = im.point(lambda v: int(70 + 185 * s_(v / 255))).filter(ImageFilter.UnsharpMask(1.5, 80, 2))
    # 4.10.: rajausreunat (hahmo leikattu kuvan reunaan) häivytetään 14 %:n matkalla (käyrä ^2,2: ylivalottuva projektori ei tee liu'usta reunaa) — muuten suora reuna piirtyy kasvoille
    w_, h_ = alfa.size; r_ = max(2, int(0.14 * min(w_, h_)))
    ramppi = Image.linear_gradient('L').point(lambda v: int(255 * (v / 255) ** 2.2))   # 0 yläreunassa → 255
    for nimi_, laatikko in (('yla', (0, 0, w_, 1)), ('ala', (0, h_ - 1, w_, h_)), ('vasen', (0, 0, 1, h_)), ('oikea', (w_ - 1, 0, w_, h_))):
        reuna = alfa.crop(laatikko).point(lambda v: 255 if v > 128 else 0)
        if sum(reuna.tobytes()) / 255 < 0.02 * max(reuna.size): continue
        k_ = Image.new('L', (w_, h_), 255); r_ = max(2, int(REUNA[nimi_] * min(w_, h_)))   # alareuna: hahmo jatkuu yleensä kirkkaana leikkaukseen asti
        if nimi_ == 'yla': k_.paste(ramppi.resize((w_, r_)), (0, 0))
        elif nimi_ == 'ala': k_.paste(ramppi.resize((w_, r_)).transpose(Image.FLIP_TOP_BOTTOM), (0, h_ - r_))
        elif nimi_ == 'vasen': k_.paste(ramppi.transpose(Image.ROTATE_90).resize((r_, h_)), (0, 0))   # ROTATE_90: tumma vasemmalla
        else: k_.paste(ramppi.transpose(Image.ROTATE_90).transpose(Image.FLIP_LEFT_RIGHT).resize((r_, h_)), (w_ - r_, 0))
        alfa = ImageChops.multiply(alfa, k_)
    ImageChops.multiply(im, alfa).save(ulos); print('KAIKU', ulos, tapa, im.size); sys.exit()
if src.mode in ('RGBA', 'LA') or 'transparency' in src.info:
    tausta = Image.new('RGBA', src.size, (255, 255, 255, 255)); tausta.alpha_composite(src.convert('RGBA')); src = tausta
im = ImageOps.autocontrast(src.convert('L').crop((x0, y0, x1, y1)), cutoff=1)
im.thumbnail((1600, 1600))
if tapa in ('keski', 'tondo'):
    # v13 (omistaja 3.10.): tarkka lähdekuva keskisävyin — ei tasokäyrää eikä sumennusta. v13b (Päätoimittaja 2×-tarkistus):
    # kontrastia nostettu S-käyrällä, jotta hahmot tunnistaa puhelimen koossa; tondo = pyöreä maljakuva tiukalla
    # pyöreällä reunalla (kylix silmäkuoppaan), muut pehmeällä soikiolla.
    import math as _m
    im = ImageOps.autocontrast(src.convert('L').crop((x0, y0, x1, y1)), cutoff=1.0)
    im.thumbnail((2048, 2048), Image.LANCZOS)
    s_ = lambda x: 0.5 + 0.5 * _m.tanh(2.6 * (x - 0.5)) / _m.tanh(1.3)
    im = im.point(lambda v: int(8 + 247 * s_(v / 255))).filter(ImageFilter.UnsharpMask(1.5, 80, 2))
    L, K = im.size; maski = Image.new('L', (L, K), 0)
    if tapa == 'tondo':
        ImageDraw.Draw(maski).ellipse((L * 0.01, K * 0.01, L * 0.99, K * 0.99), fill=255)
        maski = maski.filter(ImageFilter.GaussianBlur(min(L, K) * 0.006))
    else:
        ImageDraw.Draw(maski).ellipse((L * 0.04, K * 0.04, L * 0.96, K * 0.96), fill=255)
        maski = maski.filter(ImageFilter.GaussianBlur(min(L, K) * 0.06))
    ImageChops.multiply(im, maski).save(ulos); print('KAIKU', ulos, tapa, im.size); sys.exit()
if tapa == 'viiva':
    # omistaja 2.10. 11.1x: "varmista jatkossa että kaikki ovat positiivina" → EI kääntöä: tummat viivat vaalealla
    # paperilla; paperi himmennetään hieman (×0,75), jotta valo ei vie kipsin muotoja, ja viivat jäävät varjoiksi
    im = im.point(lambda v: int(min(255, v) * 0.75))
else:
    im = im.point(lambda v: 0 if v < 105 else min(255, int((v - 105) * 255 / 130)))
im = im.filter(ImageFilter.GaussianBlur(1.0))
L, K = im.size; maski = Image.new('L', (L, K), 0)
ImageDraw.Draw(maski).ellipse((L * 0.06, K * 0.06, L * 0.94, K * 0.94), fill=255)
maski = maski.filter(ImageFilter.GaussianBlur(min(L, K) * 0.08))
ImageChops.multiply(im, maski).save(ulos); print('KAIKU', ulos, tapa, im.size)
