# YHTEINEN OHJE — Pariisin yksityiskohtakuvat

## Mitä tehdään

Matkakirja-peli (suomenkielinen seikkailupeli, 13+ ja aikuiset) näyttää kaupunkioppaan
kerronnan aikana sivussa pieniä kuvia. Kertoja lukee kohteen tekstin ääneen; kun hän
mainitsee konkreettisen yksityiskohdan, siitä lentää sivuun kuva noin 4–6 sekunniksi.
Kuvien tehtävä: näyttää se, mitä ylhäältä 3D-kartasta EI näe — esineitä, rakennuksen
osia, historiallisia tilanteita.

Valitse jokaisesta sinulle annetusta tekstistä **1–3 konkreettista, kuvattavaa
yksityiskohtaa**. Henkilö kelpaa vain jos hän on tekstin ydin (esim. Charles Godefroy
lentämässä kaaren läpi — tilanne, ei muotokuva).

## Ankkuri

Ankkuri = **tarkka sana tai lyhyt fraasi tekstistä SELLAISENAAN**, kopioituna
merkki merkiltä (myös heittomerkit ja aksentit). Kuva ajoitetaan sen kohdalle.

Säännöt:
- Ankkurin on esiinnyttävä tekstissä **täsmälleen kerran** — ei monitulkintaisia
  yleisiä sanoja ("torni", "vuonna").
- 1–5 sanaa. Mieluiten substantiivilauseke, jonka kohdalla kuva on looginen.
- ÄLÄ käytä tekstin kolmea ensimmäistä sanaa ankkurina (kuva ei ehdi).
- Saman tekstin ankkurit eivät saa olla liian lähellä toisiaan — jätä vähintään
  noin 15 sanaa väliä, jotta 4–6 sekunnin kuvat eivät mene päällekkäin.
- Tarkista ankkuri ohjelmallisesti (katso "Ankkurin tarkistus" alla).

## Kuva

Wikimedia Commonsista. Sallitut lisenssit: **PD (public domain), CC0, CC BY, CC BY-SA**
(mikä tahansa versio). **EI** NC-, ND- eikä epäselviä lisenssejä. EI "fair use".
EI vesileimoja.

Jokaisesta kuvasta on PAKKO:
1. Hakea lisenssi ja tekijä Commonsin API:sta (extmetadata).
2. **Ladata pikkukuva ja KATSOA se Read-työkalulla.** Arvioi:
   - Näyttääkö se juuri sitä, mitä teksti sanoo? (Esim. Point zéro -ankkuriin pitää
     näkyä pronssinen tuuliruusu kivetyksessä — EI turisti seisomassa sen päällä.)
   - Onko kohde tarkka ja tunnistettava?
   - Ei vesileimaa, ei päälle kirjoitettua tekstiä, ei kollaasia.
   - Toimiiko vaakakuvana tai neliönä noin 40 % ruudun koossa? Pystykuva käy vain
     jos kohde on selvästi pystysuuntainen (obeliski, tornihuippu) ja rajautuu hyvin.
3. Historialliseen faktaan **aikalaiskuva tai -maalaus** (esim. 1871 rauniot =
   aikalaisvalokuva), esineeseen ja rakennuksen osaan **nykykuva**.

## Jos sopivaa vapaata kuvaa ei löydy

Älä pakota huonoa kuvaa. Kirjaa CODEX-TILAUS havainnekuvasta:
- mitä kuvataan
- mistä kulmasta / etäisyydeltä
- aikakausi
- olennaiset yksityiskohdat, jotka kuvassa on oltava
- mitä EI saa näkyä

## Työkalut

Kaikissa alla olevissa curl-kutsuissa käytä samaa UA:ta ja `sleep 1` väleissä:
`-H "User-Agent: MatkakirjaBot/1.0 (https://github.com/ravelius/Matkakirja)"`

### Lisenssi + koko + thumb-URL
```
curl -sS -H "User-Agent: MatkakirjaBot/1.0 (https://github.com/ravelius/Matkakirja)" \
  "https://commons.wikimedia.org/w/api.php?action=query&prop=imageinfo&iiprop=url%7Cextmetadata%7Csize&iiurlwidth=640&format=json&titles=File:TIEDOSTONIMI" \
  | python3 -I -c "import sys,json;d=json.load(sys.stdin);p=list(d['query']['pages'].values())[0];i=p['imageinfo'][0];m=i['extmetadata'];print(i['width'],i['height']);print('LIC',m.get('LicenseShortName',{}).get('value'));print('ART',m.get('Artist',{}).get('value'));print('THUMB',i['thumburl'])"
```

### Haku Commonsista
```
curl -sS "https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=HAKUSANAT&srnamespace=6&srlimit=20&format=json"
```
Myös kategoriat toimivat hyvin:
```
curl -sS "https://commons.wikimedia.org/w/api.php?action=query&list=categorymembers&cmtitle=Category:KATEGORIA&cmtype=file&cmlimit=50&format=json"
```

### Pikkukuvan lataus — WIKIMEDIAN ROBOTTIPOLITIIKKA (päätoimittajan ohje, sitova)

**Käytä aina tätä User-Agentia, älä mitään muuta:**
```
MatkakirjaBot/1.0 (https://github.com/ravelius/Matkakirja)
```
- **ÄLÄ** väärennä selaimen User-Agentia (Mozilla/Chrome/Safari). Se rikkoo
  Wikimedian robottipolitiikkaa.
- **ÄLÄ** laita User-Agentiin sähköpostiosoitetta.
- **Enintään 1 pyyntö sekunnissa** (myös API-kutsut). Laita `sleep 1` jokaisen
  curl-kutsun väliin.
- Hae **vain API:n palauttamia `thumburl`-pikkukuvia**, enintään **640 px**
  (`iiurlwidth=640` tai pienempi). Älä hae alkuperäistiedostoja.
- Jos saat **HTTP 429**: lue `Retry-After`-otsake, odota sen verran (jos otsaketta
  ei ole, odota 30 s) ja hidasta tahtia. Älä kierrä rajoitusta UA:ta vaihtamalla.

```
curl -sS -H "User-Agent: MatkakirjaBot/1.0 (https://github.com/ravelius/Matkakirja)" \
  -D /tmp/claude-0/-home-user-Matkakirja/92630146-fbe7-5d0f-a144-5b6e2651bae9/scratchpad/hdr.txt \
  -w "http=%{http_code}\n" \
  -o /tmp/claude-0/-home-user-Matkakirja/92630146-fbe7-5d0f-a144-5b6e2651bae9/scratchpad/thumbs/NIMI.jpg "THUMB_URL"
file NIMI.jpg   # varmista että on JPEG/PNG eikä HTML-virhesivu
sleep 1
```
Sitten `Read` tiedostoon → katso kuva. SVG-tiedostoista pyydä PNG-thumb
(iiurlwidth tuottaa sen automaattisesti).

**Jos pikkukuvat eivät silti aukea** (toistuva 429 tai estetty lataus): valitse
kuvat API:n metatietojen ja Commonsin kuvaussivun perusteella (ObjectName,
ImageDescription, Categories, mitat, lisenssi) ja merkitse **`tarkistettu: false`**
jokaiselle kuvalle, jota et itse nähnyt. Kirjoita silloin `perustelu`-kenttään
selvästi "EI NÄHTY — valittu metatietojen perusteella" ja mihin tietoon valinta
perustuu. Älä merkitse mitään näkemättä `true`:ksi.

### Ankkurin tarkistus
Lue `esittely-tyo/malli/pariisi.json` ja laske esiintymät:
```
python3 -I - <<'EOF'
import json
d=json.load(open('/home/user/Matkakirja/esittely-tyo/malli/pariisi.json'))
k={x['id']:x for x in d['kohteet']}
# esim.
t=k['Q243']['teksti']
for a in ["ankkuri1","ankkuri2"]:
    print(repr(a), t.count(a))
EOF
```
Vaadittu tulos: täsmälleen 1.

## HUOM Notre-Dame (Q2981)

Päätoimittaja on ilmoittanut, että Notre-Damen tekstit ovat muuttumassa:
`teksti` alkaa sanoilla "Katedraali Notre-Dame seisoo" ja `lyhyt` sanoilla
"Katedraalin pelasti rappiolta". Muuten tekstit ovat samat kuin tiedostossa.
→ Älä valitse Notre-Damen ankkuria tekstin ensimmäisistä sanoista lainkaan.
Muualta tekstistä ankkurit ovat turvallisia.

## Kaupungin avaus (tekstilaji "avaus")

Avaus ei ole tiedostossa. Se kuuluu:

"Tervetuloa Pariisiin. Ylhäältä kaupunki näyttää vaalealta kiviviuhkalta, jonka
keskellä Seine kiemurtelee kahden saaren ohi. Kierros alkaa joen keskeltä
Cité-saarelta, josta Pariisi sai alkunsa ja jolla Notre-Dame on seissyt
1100-luvulta asti."

kohde_id avaukselle on `avaus`.

## Tuloksen muoto

Kirjoita **oma** JSON-tiedostosi (polku kerrotaan tehtävässäsi), joka on taulukko
oliota. Kenttäjärjestys:

```json
[
  {
    "kohde_id": "Q243",
    "tekstilaji": "teksti",
    "ankkuri": "seitsemänkymmenenkahden ranskalaisen tiedemiehen",
    "kuvateksti": "Eiffelin 72 nimeä kullattuina tornin kyljessä",
    "commons_tiedosto": "File:Esimerkki.jpg",
    "url": "https://commons.wikimedia.org/wiki/File:Esimerkki.jpg",
    "lisenssi": "CC BY-SA 4.0",
    "tekija": "Etunimi Sukunimi",
    "leveys": 3000,
    "korkeus": 2000,
    "tarkistettu": true,
    "perustelu": "Katsoin pikkukuvan: ... (1–2 lausetta, mitä kuvassa näkyy ja miksi se osuu ankkuriin)"
  }
]
```

- `tekstilaji`: "teksti", "lyhyt" tai "avaus"
- `kuvateksti`: suomeksi, **enintään 8 sanaa**, ei loppupistettä, ei lainausmerkkejä
- `leveys`/`korkeus`: alkuperäisen tiedoston pikselit (API:n width/height)
- `tarkistettu`: true vain jos olet oikeasti KATSONUT pikkukuvan ja lisenssi on ok
- `perustelu`: pakollinen, menee .md-raporttiin

Jos teet CODEX-TILAUKSEN, kirjoita se erilliseen .md-tiedostoon (polku tehtävässäsi),
muodossa:

```
## <kohde_id> / <tekstilaji> — ankkuri: "<ankkuri>"

**Mitä kuvataan:** ...
**Kulma ja rajaus:** ...
**Aikakausi:** ...
**Olennaiset yksityiskohdat:** ...
**Ei saa näkyä:** ...
**Miksi ei vapaata kuvaa:** ...
```

Tilaus EI mene JSON-tiedostoon.

## Tavoitemäärä

Noin 2–3 kuvaa per teksti. Kohteissa joissa on sekä `teksti` että `lyhyt`,
molemmista otetaan omansa. Laatu ennen määrää: jos jokin yksityiskohta ei saa
kunnon kuvaa, tee siitä Codex-tilaus.

## Mitä EI saa tehdä

- Älä muokkaa mitään repon tiedostoa. Kirjoita vain omiin scratchpad-tiedostoihisi.
- Älä lataa kuvia repoon.
- Älä arvaa lisenssiä — hae se aina API:sta.
- Älä merkitse `tarkistettu: true` ilman että olet katsonut kuvan.
