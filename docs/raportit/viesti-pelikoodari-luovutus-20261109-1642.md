# Pelikoodari: luovutus 09.11.2026 klo 16.42

Korvaa kaikki aiemmat. Nollaus kontekstivahdista (26 %). Edellinen: `git show dde96aa98:docs/raportit/viesti-pelikoodari-luovutus-20261109-1625.md`
(sen kohdat hoidettu tai alla). Kuvat ≤ 1000 px (PIL-arkki scratchpadiin), laajat haut Sonnet-agenteilla.
Unity-työpuu /Users/Shared/Claude/wt/proto-pelikoodari-juoksu (remote natiivi-backup), nyt haarassa pelikoodari/pulu-mallinostot.
Pulun esigenerointi: /Users/Shared/Claude/wt/pulu-kaupungit-maat (haara pelikoodari/pulu-kaupungit-maat, 74c747199).

## 1. UUSI TYÖ, EI ALOITETTU: PT 16.3x ÄÄNITYÖ (OMISTAJAN PÄÄTÖS 16.34)
Omistaja: "kyllä kumpaankin. luennoissa ongelma on vain ihan alussa. uskon että kun alussa on ensin suomenkielistä tekstiä niin
sitten kaiken voi äänittää putkeen ja tulee suomea kaikista"
1) NIMIOTTO (lupa annettu): Pariisin ~129 kohdenimeä YHTENÄ ottona (yksi with-timestamps-pyyntö suomenkielisessä lauseyhteydessä,
   5.11. välilauseiden tapa valilauseet-putki-20261105/generoi.mjs – kansiota ei löytynyt find -maxdepth 5:llä, hae syvemmältä tai
   loki-hae "välilause"; leikkaus aikaleimoista), William/nimet-v2-asetukset (/Users/Shared/Claude/proto-3d/tyokalut/pelikoodari-ajot/
   nimet-v2.py: WILLIAM oae6GCCzwoEbfc5FHdEu, eleven_v4, style 0, PCM-linja), language_code fi. Nimet kuten kartalla, EI ranskalaisia
   ääntämysvihjeitä. ENSIN lausuntatesti 5–6 nimellä (Notre-Dame, Louvre, Sacré-Cœur, Tuileries'n palatsi, Place des Vosges, Grand
   Palais) → kuuntele/arvioi → koko otto. Lista: /Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/
   pariisin-kohdenimet-aanitys-20261109.md (tarkista Merkittavat.json/kohdekartat-sijainnit.json:sta, ajantasaiset; mukaan myös PR 6517:n
   4 uutta: Invalidit, Sainte-Chapelle, Grand Palais, Tour Montparnasse jo listalla). Kytke peliin, missä nimi soitetaan (selvitä:
   palkki/nosto/kyltti).
2) LUENTOJEN ALUT: laske Pariisin nostoluennot, jotka alkavat ranskalaisella nimellä → määrä PT:lle (KK-kortti ennen ottoja).
   Luennat: esigeneroi-luennat.py (sama kansio; avain sha256 v1|malli|ääni|nopeus|loppuTagi|teksti, syöte NUI:n JSONL-vienti).
Raporttiin merkkimäärät/krediitit.

## 2. ODOTTAA JU:TA: PULUN MALLINOSTOT (PT:n tilaus 16.2x; KS:n luonnos PR 6517, OMISTAJAN PÄÄTÖS 16.23)
- Paikka: FRA-paketin kohdat kohdekartta:pariisi:{Invalidit, Sainte-Chapelle, Grand Palais, Tour Montparnasse} – natiivin
  keskikohdelähde (PuluChat.Lahteet NahtavyysLahde, Kohta = kohdenoston tunnus) lukee ne ilman koodimuutosta. Ämpäriin ei
  ylikirjoiteta → uusi polku pulu/vastaukset/v3 (natiivi 4c49da614 haarassa natiivi-backup pelikoodari/pulu-mallinostot =
  pulu-lahteet e31921ac7 + KS:n nostorungot c1e3b07bf + v3; testi KohdekartanMallinostoKohta, PuluValmiit 8/8, unity-tarkistus 0).
- Tekstit: 8 kysymystä (faktat tarkennettu) + 25 linkkivastausta Pulun äänellä, tarkista-era/-valmis 0 virhettä
  (pulu-esigenerointi/MALLINOSTOT; työkalut valmistele-mallinostot.mjs, yhdista-mallinostot.mjs; v-tason muutos = PULU_VERSIO uusi).
- Paketti /Users/Shared/Claude/proto-3d/_valmiit/pulu-v3-mallinostot-vienti-20261109 (44, --kuiva ok) → JU vientiin (viesti 16.4x).
- JU-ajo pyydetty, kun PR 6517 mainissa + vie-sisalto mennyt + v3 viety: sk-pulu-mallinostot.txt
  (/Users/Shared/Claude/proto-3d/_tyo/pelikoodari/pulu-mallinostot/) iphone → lokit/pk-pulu-mallinostot-iphone-4c49da614.
  TEE: katso m-1 (lista auki, keskikohde kohdekartta:pariisi:Invalidit valmiit 2), m-2 (valmis vastaus kyllä), m-3 Montparnasse →
  PT:lle ≤ 3 riviä + kuvapolku; junaan 4c49da614 cb19b7556:n tilalle (v3 sisältää v2:n). KS ilmoittaa, kun 6517 mainissa.

## 3. MUUT AUKI
- EN cb19b7556 KATSOTTU ja PT:lle 16.3x: kelpaa (arkki _tyo/pelikoodari/pulu-lahteet/arkki-pulu-valmiit-iphone-cb19b7556.png);
  Monacon "RANSKA" alakulmassa = kartan maanimi, ei Pulu.
- EK-vika (lähde 3 generoidut eivät näkyneet): diagnoosiajo lähteet3 e31921ac7 JU:lla (lokit/pk-pulu-lahteet3-iphone-e31921ac7, ei vielä
  16.4x) – TEE: lue "MATKAKIRJA pulu: ehdotukset …/ohitettu/epäonnistui"; jos worker ei vastaa editorissa, korjaa tai kerro PT:lle.
- **Liiketappi 8cdb4549c** (natiivi-backup pelikoodari/vasen-tikku = natiivi-ui/palkki-aina aa46f41db + 8841fd32f + liiketappi; OMISTAJA
  16.16 PT:n kautta "vasemman peukalon kohdalle … lähemmäs ja kauemmas sekä vasemmalle ja oikealle … orbit pysyy käynnissä … dronella"):
  LiikeTappi.cs (oikean kameratapin peilikuva, KameraTappi luo ja ajaa), KameraEleet.LiikeMuutos (+ testi LiikeTappiSuunnat, 4/4),
  PalloKierto.TappiLiiku: kierron aikana zoom/siirto kertyy ajon päälle (AjonLiikeSiirto Eteneessä), muuten drone. QA `ui liiketappi tila|x y s`.
  JU-ajo sk-liiketappi-1 iphone + pieni iPad → lokit/pk-liiketappi1-{iphone,ipad-pieni}-8cdb4549c pyydetty EN:n perään. TEE: katso
  l-0 (vasen tappi ei maan nimen/Liiku-napin päällä, varsinkin iPad), l-1…l-3 liike, o-1…o-4 kierto jatkuu ("kierron päällä > 0").
  EI JUNAAN: NUI (16.3x) – PalloKierron kierto-/ajologiikka on NUI:n; uusi NUI-sessio tekee haaraan natiivi-ui/temple-orbit julkisen kutsun
  (etäisyys ± ja keskuksen siirto kiertoa katkaisematta) ja kertoo nimen+sha:n → vaihda LiikeTappi/TappiLiiku sen kutsuun ja poista oma
  ajoLiikeKerroin/AjonLiikeSiirto PalloKierrosta. Kuvat PT:lle katsottuina (tuntumaksi), junaan vasta NUI:n rajapinnalla.
- Kun kaikki kuitattu: rivi PT:lle "JONO TYHJÄ: Pelikoodari". Tyylikirjan generointi palautetaan git checkoutilla; unity-tarkistus
  `sh Peli-testit/unity-tarkistus.sh`, testit `cd Peli-testit && sh kaanna.sh <osa>`.

## LISÄYS 16.4x (PT)
- cb19b7556 menee junaan jo nyt; 4c49da614 tulee myöhemmin sen PÄÄLLE, kun Invalides-kuva katsottu. Äänityö: testi 6 nimellä ensin → PT.
- JU 16.4x: EQ ajossa: liiketappi1 8cdb4549c iphone + pieni iPad → lokit/pk-liiketappi1-{iphone,ipad-pieni}-8cdb4549c, sitten lahteet3 e31921ac7 → lokit/pk-pulu-lahteet3-iphone-e31921ac7. cb19b7556 + d58806806 junassa 223 (85d3bab39).
- JU 16.43: v3 VIETY (pulu/vastaukset/v3, 44, virheitä 0). Mallinostoajo 4c49da614 odottaa PR 6517 + vie-sisalto; JU ajaa heti.
