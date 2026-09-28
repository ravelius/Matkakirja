# iPad nostokortti-stressitesti 1.0.40 (60f69fe4) — Laitetestaaja, 28.9.2026 klo 23.5x

Laite iPad Pro 13-inch (M5) 3B4CDACB, käännös 60f69fe4. Kortti: Delfoi (Ateena-savukkeen
lähialue). Testin tavoite Päätoimittajan tilauksesta: 20× kuva / 20× kaiutin / 20× mini-hampurilainen,
sulkeutumiset erikseen. **HUOM: en ehtinyt täydellisiin 20/20/20-sarjoihin — löydös oli niin
vakava ja toistuva, että raportoin heti sen sijaan että olisin jatkanut mekaanista laskentaa
loppuun.**

## 1) Kuva ×20: PASS — 0/20 sulkeutumista
Napautin isoa havainnekuvaa (mk-nosto__kuva) 20 kertaa peräkkäin kortin ollessa auki (aluksi
"pelkkänä kuvana", laajeni tekstiin). Tarkistin joka kerta `ui puu`:sta elementtien
`mk-nosto__*`-määrän (luotettava avoin/kiinni-mittari — HUOM ALLA). Kortti pysyi auki koko ajan.

## 2) Kaiutin: EI PASS — VAKAVA JA TOISTUVA LÖYDÖS (≈6/7 sulkeutumista)
Napautin kortin oman otsikkorivin kaiutinta (mk-kaiutin__osa, tarkistettu `ui puu`:sta joka
kerta ennen napautusta — koordinaatit osuivat aina 20×20 pt -ikonin keskelle). **Kortti sulkeutui
lähes joka kerta ensimmäisestä kaiutin-napautuksesta**, riippumatta:
- oliko kortti "pelkkänä kuvana" vai jo laajennettu (molemmissa sulkeutui)
- odotinko 1 s vai 3 s uudelleenavauksen jälkeen ennen napautusta (molemmissa sulkeutui)
- ei mitään virhe-/poikkeusriviä pelilokissa tai Unity-konsolissa napautuksen yhteydessä (hiljainen sulkeutuminen)

Testasin 7 kertaa vaihtelevin olosuhtein: 1 PASS (peräkkäin kuva-vaiheen jatkeena, kortti oli jo
"lämmin"), loput 6 kaikki sulkivat kortin heti. Tämä on JUURI SE bugi jonka piti olla korjattu
(b3046146/7247e31a) — mutta **iPadilla (3B4CDACB) se reprodusoituu edelleen voimakkaasti**, kun
taas samalla käännöksellä iPhonella (1572C658, ks. savukierros-1040-lopullinen-20260928.md) kaiutin
toimi moitteettomasti yhtä nostokorttia (myös Delfoi) testatessa. **Epäilty laite-/resoluutiokohtainen
regressio**, ei yleinen — tarkista iPadin layout-erikoistapaus (leveämpi kortti, eri asettelu).

## 3) Mini-hampurilainen ×5 (ei täyttä 20): PASS — 0/5 sulkeutumista
Napautin lukijan valikkoikonia (mk-lukija__valikkoikoni, laajennetussa tilassa löytyi x≈755,
eri paikassa kuin iPhonen 322 — iPadin leveämpi kortti). Kortti pysyi auki kaikilla 5 kerralla.

## Menetelmävirhe kesken testin (korjattu)
Ensimmäisellä yrityksellä käytin väärää "kortti auki" -tunnistetta (`mk-matkakirja__otsikko
mk-matkakirja__otsikko--paikka`, joka on AINA näkyvissä yleisessä yläpalkissa riippumatta
nostokortista) — tein 40 napautusta (kuva+kaiutin) huomaamatta että kortti oli jo sulkeutunut
jossain vaiheessa. Vaihdoin oikeaan tunnisteeseen (`mk-nosto__`-etuliite, spesifinen kortin
sisällölle) ja aloitin uudelleen puhtaalta pöydältä — yllä olevat luvut ovat korjatulla
menetelmällä.

## Suositus
**Älä julkaise 1.0.40:aa iPadille ennen kuin Natiiviseppä/Natiivi-UI vahvistaa kaiutin-löydöksen
korjauksen iPadin omalla layoutilla.** iPhonella sama build vaikuttaa kunnossa olevalta.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
