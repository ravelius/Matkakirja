# Natiivi-UI:n luovutus 27.9.2026 (w), klo 08.2x

Jatkaa luovutusta (v). Simulaattorit: oma iPhone 17 FB234D08, jaettu iPad Pro 11 503000D1 (Laitetestaaja: vapaasti
käytössä). Fable = local_5df52e10-10e4-4b72-9554-0049db300dfe. Natiiviseppä, Pelikoodari, Karttaseppä, Laitetestaaja,
Linssiseppä (= Mallinseppä) tavoitetaan SendMessage-nimellä.

## KESKEN: AVAUSKORTTI NATIIVIIN (Fable 07.2x, omistaja hyväksyi webin v2296 01.4x)

Haara `natiivi-ui/avauskortti` @ **3de0ca7f** (työkopio /Users/Shared/Claude/wt/proto-natiivi-ui-sisallys). Sisältää
Pelikoodarin `pelikoodari/kortti-ilman-ajoa` c7b475d7 (merge 0cfd281c) → MERGE-PYYNNÖSSÄ MAINITTAVA: Pelikoodarin haara ensin.
Unity-tarkistus 0 virhettä. EI VIELÄ MERGE-PYYNTÖÄ: kuvapari → Fable → omistajan kortti ensin.

Tehty (webin v2296 malli, mitat css/kaupunkinosto.css + styles.css, speksi alla):
- `UI/Avauskortti.cs` (IKaupunkiKortti, UiNakymat.Kaupunkikortti; vanha liuska UiNakymat.Liuska vain `ui kaupunki`):
  hero 16 % ruudusta (iPad 14 %, väh. 120) avauskuva/kansikuva cover + nimi 30,4 Luku lihava varjolla; esittely
  (KaupunkiTiedot.Intro, 2 lausetta, 3 riviä / iPad 4 + "…"); "Lue kaupunkilehti →" (näkyy kun LueLehti ≠ null);
  nähtävyyskartta kaista 35 % ruudusta (KohdekarttaNakyma pelkka: ei kylttejä/nimiä/mittajanaa, täyttää kaistan,
  napautus → suurennos); turisti-info (LehtiSisalto.HaeOpas + uusi OppaanKuva). Leveys min(560, ruutu − 24), 8 pt
  yläpalkin alla, kulma 16, × 33,6 ympyrä. Ohi-napautus sulkee. Kasvu kutsusta 280 ms / häivytys 200 ms.
- `KohdekarttaNakyma.cs`: `pelkka`-tila + `Kohdekartan.AvaaKokoruutu(k, avaa, kortista: true)` (94 % × 88 %,
  sumea pohja UiNakymat.KuvaSumea ← Kohdekartan.KortistaAuki, − + oikeassa alakulmassa, pohja sulkee, ei luetteloa).
- `UI/Kutsuminiatyyri.cs` (UiNakymat.Kutsu): 64 pt kortti pelaajan kaupungin vieressä, asennot renkaittain 16/40/70/100
  (web KUTSUN_ASENNOT), väistää NostotKartalla.Laatikot, yläpalkin, Matkakirjan, Pulun, Liikun ja kaupungin+nappulan;
  piilossa jos Karttakerroin < 0,95, linssissä, muu tila kuin Kartta tai kortti näkyvissä. Napautus →
  Avauskortti.SeuraavaLahde + PeliOhjain.AvaaKortti.
- `UI/Lehti/Lehtiosiot.cs`: kaupunkilehden etusivun "LEHDEN OSIOT" (web lehtiosiot.js); kaupunkilehdestä pois
  Matkailijalle ja Mediarivi (radio). Aluelehdet ennallaan.
- UiNakymat: KortinRuutupiste = KaupunginRuutupiste (ei panorointia), PeliOhjain.KorttiIlmanAjoa = true.
- Tyylit: Kohdekartta.uss (avauskortti, pelkkä kartta, kortista, kutsu), Lehti.uss (osiot).
- Testikomennot: `ui avauskortti <id> [kartta|lehti|opas|sulje]` (kuvaus lokiin 2 s), `ui kutsu [napauta]`.

Todennettu käännöksellä 9b6beb1a (iPhone + iPad, kuvat proto-3d/lokit/natiivi-ui-avauskortti/): kortti ≈ web, suurennos
≈ web, lehden osiot ≈ web (Pariisi). Korjattu sen jälkeen (36e3f4bc, 3de0ca7f), EI VIELÄ AJETTU: kutsun nimi
alareunaan (napin flex-direction column), esittely 3 riviä (raja = "Ag\nAg\nAg"-korkeus), kortin maxHeight turva-alueesta
(Reunat(Traileri).w), mittajana pois pelkästä kartasta, lehtilinkki aina kun LueLehti.

SEURAAVAKSI:
1. Klo 09.00 käännös oli jonossa taustalla (`proto-kaanna.sh juna/b13+natiivi-ui/avauskortti` FB234D08 + 503000D1).
   Tarkista `ls -t proto-3d/lokit/kaannospalvelu/*avauskortti*.log | head -1 | xargs tail -1`. Jos ei ajettu, aja
   seuraavassa :00–:15-ikkunassa (rivi Karttasepälle ensin). Asenna .app uudelleen itse (`simctl install` kaannos-
   kopion Build/dd-sim/.../Matkakirja3D.app) — toisen istunnon asennus jättää sovelluksen käynnistymättömäksi.
2. Todenna: kutsu (nimi alareunassa, kuva), kortti (3 riviä + linkki + koko kortti näkyy), suurennos, lehti osiot.
   Testikaava: `uusi-peli 1 pariisi`, `puhe pois`, `ohita-traileri`, `ui sulje`, `ui kutsu`, `ui kutsu napauta`,
   `ui avauskortti pariisi kartta`, `lue-lehti pariisi` + `ui lehti vierita loppu`. Kuvat `kuva <nimi>` komento.txt:llä.
3. Kuvaparit web vs natiivi iPhone + iPad (web: proto-3d/lokit/kaupunkikortti-web/pariisi-iphone-0-kutsu … -3-lehti,
   pariisi-ipad-1-kortti, -2-kartta; kuvapari-avauskortti-pariisi-390/834.png). Merkintä SUORAAN kuvaan: versio (web
   v2296 / natiivi <sha>), laite ja kuvakulma; kohde isona. Apuskripti: scratchpad merkitse.py (PIL, AmericanTypewriter
   index 1) — kopio ohessa alla, jos scratchpad on tyhjä.
4. Kuvaparit Fablelle → omistajan kortti → merge-pyyntö Natiivisepälle (Pelikoodarin c7b475d7 ensin).

## AVOIMET MERGE-PYYNNÖT / TODENNUKSET
- `natiivi-ui/lukija-putki` @ f9fa2863 (Pelikoodarin pelikoodari/lukija-putki 478158ea päällä; web #3368 mainissa v2297):
  Natiivisepällä. Todenna 1.0.28-käännöksestä: tauko otsikon ja kappaleen välissä (ms) kortin/lehden/nähtävyysarkin
  luennassa (Pelikoodari kuittasi toteutuksen oikeaksi).
- `natiivi-ui/striimiaani` @ 3a91d9c6 (USS: valitsin nimen alle): Natiivisepällä, todenna iPhonella (Kehittäjä-osa:
  hampurilainen (356,42) → Kehittäjä (330,158) 1,5 s tauoin; kehittäjätila: simctl spawn defaults write kontin
  plistiin matkakirja-kehittaja 1).
- `natiivi-ui/pulu-kaiutin` @ 9747aec8 (PASS, kuvapari proto-3d/lokit/natiivi-ui-laite-20260927/kuvapari-kaiutin-natiivi.png)
  ja `natiivi-ui/nosto-hylkaa-170` @ fa30e4a3 (P1 NRE, PASS v195 → v198): Natiivisepällä 1.0.28-junaan (Fable: P1 kärkeen).

## TEHTY TÄLLÄ VUOROLLA (kaikki mergetty junaan tai PASS)
- Laite-erä käännöksellä da5c85d4 (kuvat proto-3d/lokit/natiivi-ui-laite-20260927/): 174 iPad Ranska maataso veto p50 16,6 /
  p95 33,4 / max 34,9 ms, lepo 30 fps; 173/169 iPad PASS (tyhjä ruutu = valintapeukalo, tarkoituksellinen); 170 iPad
  v176 → v194 kesken istunnon PASS (Attika-kuva heti); 179 kuvapari ennen (build 26 "Tapaa Iason") / jälkeen PASS;
  178 Ateenan 4 tarinakohdetta nostoissa PASS.
- 177 (kortti auki + uusi-peli): korjaus cc33ba3b (MatkaAlkoi sulkee sisältöikkunat) PASS 1.0.27 16be7e44
  (kuvapari-177-kortti.png), Laitetestaaja kuittasi.
- 179 Tapaa-nappi pois lehdestä (1287c7f7), Pelikoodari vahvisti reitin (vihreä piste → EtsiKatko).
- 178 kartalla vain kartalla-kohteet (a69fad42), Nostokortti.Avattu (1a46986d, Mallinseppä kytki).
- Striimiääni (0677592b, 38fa2a87 junassa 1.0.27; 3a91d9c6 pyynnössä), kaiutinvipu, P1 170-NRE, lukija-putki (yllä).
- Kartoitukset Fablelle: maanosaeteneminen (Peli/Kaupat.cs MannerLennot pääaarre-ehto, Lahtokaupungit) ja kohdemaan
  nostojen vaiheittainen paljastuminen (Kartta/NostoKerros.cs: vahinOsuus 0,5, saapumisPortti 1,4 s + syttyminen,
  taso 3 lähizoom, katto 120; Peli/KarttaMuste.cs salaisuus). Fablen päätös: Pelikoodari tekee molemmat,
  Aloitusnakyma ei muutu, Natiivi-UI:lle ei jäänyt tästä mitään.

## OPIT
- Käännökset poltonaikana: :00–:15-ikkunassa, rivi Karttasepälle ensin; pidä yksi käännös / tunti.
- Toisen istunnon `simctl install` tai proto-kaanna.sh:n asennus → "Application failed preflight checks" /
  "No such process": asenna .app uudelleen (kopioi talteen `ditto` ennen seuraavaa käännöstä).
- Saapumisesitys (Pulun luentakortti) pilaa mittaukset ja kuvat: `ohita-traileri` + odota ~20 s + `ui sulje`.
- PlayerPrefs näkyy simulaattorin plistissä vasta, kun sovellus menee taustalle (HOME).
- UI-puu (`ui puu` → Documents/ui-puu.json, kentät luokat/teksti/x/y/w/h/kuva) on nopein tapa löytää asetteluvika.

## merkitse.py (kuvien merkintä)
```python
from PIL import Image, ImageDraw, ImageFont
F='/System/Library/Fonts/Supplemental/AmericanTypewriter.ttc'
def merkki(im, teksti, koko=None):
    im=im.convert('RGB'); d=ImageDraw.Draw(im); koko=koko or max(28, im.width//26)
    f=ImageFont.truetype(F, koko, index=1); rivit=teksti.split('\n'); h=int(koko*1.35)
    w=max(d.textlength(r,font=f) for r in rivit)+koko
    d.rectangle([0,0,w,h*len(rivit)+koko//3], fill=(40,26,14))
    for i,r in enumerate(rivit): d.text((koko//2, koko//6+i*h), r, font=f, fill=(245,225,170))
    return im
def vierekkain(kuvat, nimi):
    h=max(k.height for k in kuvat); w=sum(k.width for k in kuvat)+6*(len(kuvat)-1)
    out=Image.new('RGB',(w,h),(40,26,14)); x=0
    for k in kuvat: out.paste(k,(x,0)); x+=k.width+6
    out.save(nimi)
```
