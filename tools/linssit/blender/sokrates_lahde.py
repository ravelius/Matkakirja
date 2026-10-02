# Sokrates v4: pieni lähderivi alareunaan (kreikka + viite) vasta, kun lause on kulkenut (Linnanrakentaja 1.10.2026), PIL.
#   python3 sokrates_lahde.py <render.png> <ulos.jpg> <38a|21d> [näkyvyys 0–1] [merkintä]
import sys
from PIL import Image, ImageDraw, ImageFont

SISAAN, ULOS, KOHTA = sys.argv[1], sys.argv[2], sys.argv[3]
NAKYVYYS = float(sys.argv[4]) if len(sys.argv) > 4 else 1.0
MERKINTA = sys.argv[5] if len(sys.argv) > 5 else ''
LAHTEET = {'38a': ('ὁ δὲ ἀνεξέταστος βίος οὐ βιωτὸς ἀνθρώπῳ', 'Platon, Puolustuspuhe 38a'),   # Sisältökirjuri 1.10.
           '21d': ('ἃ μὴ οἶδα οὐδὲ οἴομαι εἰδέναι', 'Platon, Puolustuspuhe 21d'),
           '49b': ('οὐδαμῶς ἄρα δεῖ ἀδικεῖν', 'Platon, Kriton 49b'),
           # Marcus Aurelius (Sisältökirjuri 2.10.: Wikisource, Farquharson 1944; Perseus)
           'm10.16': ('Μηκέθ᾽ ὅλως περὶ τοῦ οἷόν τινα εἶναι τὸν ἀγαθὸν ἄνδρα διαλέγεσθαι, ἀλλὰ εἶναι τοιοῦτον.', 'Marcus Aurelius, Itselleen 10.16'),
           # kierrokset 2–3 (2.10. 12.3x): sama kreikka kuin taustavirrassa, Sisältökirjuri tarkistaa
           'm4.49': ('Ὅμοιον εἶναι τῇ ἄκρᾳ, ᾗ διηνεκῶς τὰ κύματα προσρήσσεται· ἡ δὲ ἕστηκε καὶ περὶ αὐτὴν κοιμίζεται τὰ φλεγμήναντα τοῦ ὕδατος.', 'Marcus Aurelius, Itselleen 4.49'),
           'm2.11': ('Ὡς ἤδη δυνατοῦ ὄντος ἐξιέναι τοῦ βίου, οὕτως ἕκαστα ποιεῖν καὶ λέγειν καὶ διανοεῖσθαι.', 'Marcus Aurelius, Itselleen 2.11')}
KREIKKA, VIITE = LAHTEET[KOHTA]
im = Image.open(SISAAN).convert('RGBA'); L, K = im.size; lyhyt = min(L, K)
kerros = Image.new('RGBA', im.size, (0, 0, 0, 0)); d = ImageDraw.Draw(kerros); alku = int(K * 0.84)
for y in range(alku, K):
    d.line([(0, y), (L, y)], fill=(8, 8, 11, int(170 * ((y - alku) / (K - alku)) ** 1.2)))
koko = int(lyhyt * 0.036)
Fk = ImageFont.truetype('/System/Library/Fonts/Supplemental/Baskerville.ttc', koko)
while Fk.getlength(KREIKKA) > L * 0.92 and koko > 8:   # pitkä kreikka (esim. Marcus 10.16) mahtuu leveyteen
    koko -= 1; Fk = ImageFont.truetype('/System/Library/Fonts/Supplemental/Baskerville.ttc', koko)
Fv = ImageFont.truetype('/System/Library/Fonts/Supplemental/Iowan Old Style.ttc', int(koko * 0.85), index=2)
y = K - int(lyhyt * 0.13)
d.text((L / 2, y), KREIKKA, font=Fk, fill=(205, 200, 190, 255), anchor='mm')
d.text((L / 2, y + koko * 1.25), VIITE, font=Fv, fill=(160, 156, 148, 255), anchor='mm')
r, g, b, a = kerros.split(); kerros.putalpha(a.point(lambda v: int(v * NAKYVYYS)))
im.alpha_composite(kerros)
if MERKINTA:
    Fm = ImageFont.truetype('/System/Library/Fonts/Supplemental/Arial.ttf', int(lyhyt * 0.022))
    ImageDraw.Draw(im).text((int(lyhyt * 0.03), int(lyhyt * 0.03)), MERKINTA, font=Fm, fill=(150, 150, 150, 255))
im.convert('RGB').save(ULOS, quality=90); print('LAHDE', ULOS)
