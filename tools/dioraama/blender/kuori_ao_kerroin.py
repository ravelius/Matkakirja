# Kontakti-AO hämärätekstuuriin (Linnanrakentaja 5.10.2026, Päätoimittajan linnan ilmeen A/B, vaihtoehto b).
# Nurkat ja kiven saumat syvenevät, avoimet pinnat ja kokonaiskirkkaus pysyvät ennallaan:
#   AO' = min(1, AO / p75(AO))  (avoimet pinnat, joiden AO on yli 75. persentiilin, eivät muutu)
#   kerroin = 1 − s · (1 − AO')  ja lopuksi vahvistus g niin, että kuvan keskikirkkaus (atlaksen täytetyt tekselit) = ennen.
# Kirjoittaa syötteen päälle (JPEG 90 kuten putki) ja tallentaa alkuperäisen nimellä *-ennen-ao.jpg vertailuun.
#   python3 kuori_ao_kerroin.py <ulkokuori-hamara-8k.jpg> <kuori-ao-4k.png> <s>
import sys, os, shutil
import numpy as np
from PIL import Image
Image.MAX_IMAGE_PIXELS = None
kuva, ao_p, s = sys.argv[1], sys.argv[2], float(sys.argv[3])
ennen = kuva.replace('.jpg', '-ennen-ao.jpg')
if not os.path.exists(ennen): shutil.copyfile(kuva, ennen)   # idempotentti: aina alkuperäisestä
im = np.asarray(Image.open(ennen).convert('RGB'), dtype=np.float32) / 255.0
H, W = im.shape[:2]
ao_i = Image.open(ao_p).convert('L')
ao = np.asarray(ao_i.resize((W, H), Image.BILINEAR), dtype=np.float32) / 255.0
lum = im @ np.array([0.2126, 0.7152, 0.0722], dtype=np.float32)
tay = lum > 0.004                                        # atlaksen täytetyt tekselit (tyhjät raot mustia)
p75 = float(np.percentile(ao[tay], 75))
aon = np.minimum(1.0, ao / max(p75, 1e-3))
k = 1.0 - s * (1.0 - aon)
ulos = im * k[..., None]
lum2 = ulos @ np.array([0.2126, 0.7152, 0.0722], dtype=np.float32)
g = float(lum[tay].mean() / max(lum2[tay].mean(), 1e-6))
ulos = np.clip(ulos * g, 0.0, 1.0)
Image.fromarray((ulos * 255.0 + 0.5).astype(np.uint8)).save(kuva, quality=90)
muuttui = float((k[tay] < 0.98).mean())
print(f'AO-KERROIN: s {s}, p75 {p75:.3f}, vahvistus {g:.4f}, tummentuneita tekseleitä {100 * muuttui:.1f} %, '
      f'keskikirkkaus {lum[tay].mean():.4f} → {(ulos @ np.array([0.2126, 0.7152, 0.0722], dtype=np.float32))[tay].mean():.4f}')
