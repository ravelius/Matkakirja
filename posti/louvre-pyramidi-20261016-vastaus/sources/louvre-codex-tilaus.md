# Codex-tilaus: Louvren palatsin havainnekuvat K1–K7 (tavoiteluuppi, Linnanrakentaja)

Tila: Päätoimittajan käsky 15.10.2026 (omistajan päätös klo 17.17, loki PAATOKSET 15.10. 17.17). Lähettäjä Linnanrakentaja.
Liitteet tässä postissa nimillä `louvre-*`. Tavoiteluupin yleisohje: `codex-peking-tavoiteluuppi-20261014.md` kohta 2
(havainnekuvat ovat sisäisiä, eivät peliin; Päätoimittaja hyväksyy ne ennen mallikierroksia).

## Tehtävä

Tuota **7 fotorealistista havainnekuvaa** Pariisin Louvren palatsista (Wikidata Q19675) täsmälleen kulmista K1–K7
(`louvre-kulmat.json`) **ja jokaisesta siluettimaski**. Kuvat ovat 3D-mallin tavoite: mallia kuvataan samoista kulmista
ja verrataan kuvaan ja maskiin (IoU), joten **kulmat, mittasuhteet ja korkeudet ovat sitovia, ei taiteellista vapautta.**

Tavoite tehdään omasta aineistosta, EI Googlen näkymästä: IGN LiDAR HD 0,5 m (massat ja korkeudet), IGN-ortokuva 20 cm
(pohja ja kattojen väri) ja Commons-valokuvat (julkisivujen muoto, kivi ja yksityiskohdat).

## Geometria on lukittu: massakuva ja maski kustakin kulmasta (TÄRKEIN KOHTA)

Jokaisesta kulmasta on kaksi valmista kuvaa, 2400 px leveitä, täsmälleen havainnekuvan rajaus ja koko:
- `louvre-K<n>-massa.jpg`: LiDAR-korkeusmallista renderöity harmaa massa samasta kamerasta (pinta on karkea ja seinät
  pystyjuovaisia: se on mittausdataa, ei arkkitehtuuria). **Piirrä havainnekuva tämän päälle**: jokaisen siiven, paviljongin,
  kupolin ja katon reunan pitää olla samassa kohdassa kuvaa kuin massakuvassa.
- `louvre-K<n>-maski.png`: palatsin rakennukset valkoisena (255), kaikki muu mustana (0). Tämä on **varmennettu tavoitesiluetti**:
  tarkistin sen ennen tilausta riippumattomasta 3D-mallista (IoU 84–94 % kuudessa kulmassa, ero selittyy mallin virheillä).

Palauta jokaisesta kulmasta oma maskisi `louvre-K<n>-maski.png` (sama koko; palatsi valkoinen, puut, ihmiset ja muut esteet
kuin niitä ei olisi). **Vastaanottotarkistus heti alussa**: lasken palauttamasi maskin IoU:n massamaskia vastaan; jos jokin
kulma jää alle 95 %, kuva piirretään uudelleen ennen kuin yhtään mallikierrosta ajetaan. (Pekingin v11:ssä IoU jäi nollaan,
koska siluetteja ei varmennettu alussa.) Pieni ero sallitaan vain siellä, missä LiDAR-massassa on selvä mittausvirhe
(esim. lyhdyn tai savupiipun piikki); kirjaa ne kuittaukseen.

## Kulmat (louvre-kulmat.json, kaikki ilmasta tai pelikamerasta)

Origo = Napoleonin piha (48.861, 2.3359), maa 0 m = pihan kiveys. `kamera_enu_m` = [itä, pohjoinen, korkeus] metreinä,
`katse_deg` pohjoisesta myötäpäivään, `kallistus_deg` + ylös / − alas, roll 0, `vfov_deg` pystysuuntainen.
Palatsin akseli kulkee suuntaan 110° (20° idästä etelään).

| Kulma | Tyyppi | Kamera | Kuvasuhde | Mitä näkyy |
|---|---|---|---|---|
| K1 | pallokierros | lännestä 380 m, 180 m korkealta | 3:2 | akselilta: Napoleonin piha, Richelieu ja Denon sivuilla, Sully ja Cour Carrée takana |
| K2 | pallokierros | pohjoisesta 450 m, 280 m | 2:1 | Rivolin puoli: Richelieun lohko edessä |
| K3 | pallokierros | etelästä 450 m, 280 m | 2:1 | Seinen puoli: Grande Galerie ja Denon edessä |
| K4 | pallokierros | idästä 380 m, 180 m | 3:2 | itäinen kolonnadi ja Cour Carrée edessä |
| K5 | pelikulma | akselilla 147 m pyramidista länteen, 32 m | 16:9 | pelin oma Louvre-näkymä Sullyn paviljonkia kohti |
| K6 | lähikierros | pohjoisesta 170 m, 130 m | 3:2 | Richelieun yltä: pihan kiveys, ratsastajapatsas, Denonin/Darun pihajulkisivut ja Denonin kupoli |
| K7 | lähikierros | etelästä 170 m, 130 m | 3:2 | Darun yltä: Richelieun/Colbertin pihajulkisivut, Richelieun paviljonki, Sully sivulla, kiveys |

Ei katutason kulmia. Julkisivujen yksityiskohdat (pilasterit, ikkunat, reliefit, veistokset, mansardit) ja kiveyksen laatat
piirretään K5–K7:ssä niin tarkasti kuin etäisyys sallii.

Kamerat ja katsesuunnat näkyvät `louvre-pohjakartta.jpg`:ssä, korkeudet `louvre-korkeuskartta.png`:ssä (LiDAR, harjat ja
kupolit: Richelieun paviljonki 50 m, Denonin 48 m, Sully 45 m, siivet 27–31 m).

## Sisältö ja rajaukset

- **EI lasipyramidia, ei altaita eikä pieniä pyramideja** (I. M. Pein teos, suojattu; tulee peliin muualta). Niiden kohdalla
  (pohjakartan punainen alue) piha jatkuu tasaisena kiveyksenä ilman esineitä. Ne eivät ole maskissa.
- **Ludvig XIV:n ratsastajapatsas** (Berninin teoksen lyijyjäljennös, pyramidin länsipuolella, pohjakartan pieni keltainen
  neliö) piirretään kaikkiin kulmiin, joissa se näkyy (K1, K5, K6); sen saa mallintaa itse. Se ei ole maskissa.
- **Julkisivut** valokuvien mukaan: vaalea hunajanbeige kalkkikivi (ei valkoinen, ei punertava), säänkulutus, likajuovat
  listojen alla, tummempi sokkeli; pilasterit, kerroslistat, reliefipaneelit, veistokset syvennyksissä, paviljonkien
  päätykolmiot ja karyatidit. Katot: sinertävänharmaa liuske ja lyijy, mansardit ja kupolit tummaa lyijyä, lyhdyt.
- **Kiveys**: Napoleonin pihan suuret vaaleanharmaat graniittilaatat (orto + valokuvat), Cour Carrée hiekkapinta ja kivireunat.
- Ympäristö pelkistettynä: viereiset korttelit, puut ja Seine saa näkyä kaukana pehmeinä, mutta eivät saa peittää palatsia
  enempää kuin todellisuudessa; ei tunnistettavia mainoksia, tavaramerkkejä, nykytaidetta tai oikeita ihmisiä (pieniä
  siluetteja saa olla K1–K5:ssä).
- Valo: kirkas päivä, aurinko etelästä 40–50° korkeudella, pehmeät varjot; kausi kesä; ei yötä, ei iltaruskoa.
- **Merkintä "havainnekuva"** pieneen kulmaan. Ei muuta tekstiä.
- Ei Googlen 3D-laattoja, Google Earthia tai Street View -kuvia lähteenä tai taustana.

## Liitteet

- `louvre-kulmat.json` (kamerat koneluettavina), `louvre-pohjakartta.jpg` (IGN-orto, mallin raja, pyramidialue, kamerat),
  `louvre-korkeuskartta.png` (LiDAR-korkeudet palatsin kehyksessä).
- `louvre-K1-massa.jpg` … `louvre-K7-massa.jpg` ja `louvre-K1-maski.png` … `louvre-K7-maski.png`.
- `louvre-ref-*.jpg` (Commons, CC BY / CC BY-SA / PD; tekijät ja lisenssit `louvre-LAHTEET.md`): vain muodon, kiven ja
  yksityiskohtien referenssiksi; älä kopioi taustoja, ihmisiä tai sommittelua.

## Palautus

`louvre-K1.png` … `louvre-K7.png` (täsmälleen massakuvan koko, 2400 px leveä) + `louvre-K1-maski.png` … `louvre-K7-maski.png`
omaan kansioon (esim. `posti/louvre-havainne-v1/`) ja lyhyt kuittaus: mitä kustakin kulmasta piti tulkita ja missä
maskisi poikkeaa massamaskista. PYSÄHDY toimituksen jälkeen: Linnanrakentaja tarkistaa maskit, Päätoimittaja hyväksyy kuvat kerran; sen jälkeen ne ovat sitova tavoite
(Linnanrakentaja ajaa mallikierrokset itse vertailuna Codexin mallintamiselle, omistajan päätös 15.10. klo 17.22).

## Lähteet

IGN LiDAR HD ja BD ORTHO (Licence Ouverte Etalab 2.0, data.geopf.fr), OpenStreetMap (© OpenStreetMap contributors, ODbL),
Wikimedia Commons (louvre-LAHTEET.md).
