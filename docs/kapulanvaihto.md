# Kapulanvaihto 14.8.2026 — kehitys siirtyy toiselle tilille

Edellisen tilin kreditit loppuivat. Tämä dokumentti on kirjoitettu,
jotta UUSI SESSIO pääsee jatkamaan heti — etenkin maa- ja
kaupunkilehtien kirjoittamista. Kun tämän dokumentin tiedot on viety
eteenpäin (työ jatkuu ja avoimet päätökset on käsitelty), siirrä
tiedosto docs/arkisto/-kansioon.

## Tila luovutushetkellä

- **Julkaistu versio: v652** (main vihreä, työhaara puhdas).
  Päivän erät v645–v652: matkakirjakortti naulattu vasempaan
  yläkulmaan, kartan väriläikät korjattu (rae kattaa koko
  pohjatason), lehtiotsikon tarttuma + ylähampurilainen kolmessa
  erässä, Etusivu-rivi sisällysvalikkoon, kuvakarusellien esilataus
  (avattavat + sivulla pyörivät + lightbox), wikin suurennos
  täyteen kokoon iPadilla.
- **Vanhan tilin sessiot eivät siirry:** Fable-päätoimittajasessio ja
  pysäytetty lehtisessio (Opus) jäävät vanhalle tilille. Lehtisession
  **Siperia-erä oli kesken eikä sitä koskaan pushattu** — se on
  menetetty ja aloitettava alusta. Vanhan tilin yövahtiajastin on
  disabloitu; sitä ei tarvitse siivota.
- **Savukkeet siirretty repoon:** `tools/savukkeet/` (ks. sen
  README). Aja lehteä tai karttaa koskevien muutosten jälkeen.

## Avoimet päätökset (ÄLÄ ratkaise ilman omistajaa)

Kaanonpäätökset on kirjattu docs/isoisan-raamattu.md:n loppuun
("AVOIMET PÄÄTÖKSET") — tärkein: **matkakirjamerkintöjä EI generoida
ennen kuin tekstityyli on määritelty omistajan kanssa.** Lehtiä ja
taustaääniä SAA tehdä.

Muut avoimet asiat (eivät kaanonia, mutta odottavat omistajaa):

1. **Pöllön Matkakirja-linkit** (tilaus 14.8, toteutus aloitettu ja
   peruttu siistiksi): sisäiset linkit siirretään vastaustekstin
   LOPPUUN muotoon "Matkakirja: linkki", enintään kaksi per vastaus
   (POLLON_LINKKIKATTO on jo 2), ja tekstin sisään jäävät VAIN pöllön
   kysymyslinkit (pollo-kasitelinkki). Kohta: js/pollo.js
   korostaLinkit/sidoLinkki (inline-sidonta pois) + kutsu ~rivillä
   2354. Huom: tools/savuke-pollo.mjs ja osa vanhan scratchpadin
   vartioista odottaa inline-linkkejä — päivitettävä samalla.
   Omistaja keskeytti työn; varmista ennen jatkamista, että se on
   yhä haluttu.
2. **Reaaliaikainen puhe (TTS) — PÄÄTETTY, toteutus tekemättä.**
   Omistaja valitsi OpenAI:n (gpt-4o-mini-tts; openai.fm on sen demo)
   ja **lisäsi OpenAI:n API-avaimen repon secreteihin 14.8.2026** —
   äänen lennossa generointi voidaan aloittaa. Suunniteltu toteutus:
   Pöllön vastausten luenta lause kerrallaan striimaten workerin
   kautta (sama välitysmalli kuin Pöllön LLM-kutsuissa; avain
   workerin/CI:n salaisuuksista, EI KOSKAAN selaimeen, repoon eikä
   lokiin), äänipersoona ohjeistuksella, nykyinen selainlukija jää
   varapoluksi verkottomaan käyttöön. Kustannus ~1,5 snt/min.
3. **TestFlight build 7** (sanelukorjaus #943 kuoreen) ja **Game
   Center -saavutukset** ASC:ssä — ideoita, eivät aloitettuja.
4. **Zoomin jäännösriskit** (kierros 3:n raportti): aidon Safarin
   erittäin nopeiden nipistysten harvinainen hyppy vaatii
   laitetodennuksen; vierityksen mikronykiminen ei toistunut
   testiympäristössä (seuraava askel olisi Web Inspector -jälki
   laitteelta).

## Lehtityön jatkaminen (ensisijainen tehtävä)

Prosessi ja mitat: **docs/tutki-aiheet.md** (sitova resepti:
maa kantaa aiheet, kaupunki kantaa kannen; 5–6 aihetta × 4–5 nostoa)
ja **docs/tyolista-opukselle.md**. Roolit ja
julkaisusäännöt: **docs/roolitus.md**. Kaanon: docs/tarina.md +
docs/isoisan-raamattu.md (vain päätoimittaja kirjoittaa niihin).

Nykytilan selvitys (aja nämä, älä arvaa):

- Maa-aiheet: `node -e "..."` tai grep ISO-koodit
  js/packs/maa-kategoriat.js:stä ja vertaa laudan maihin
  (js/packs/*-countries.js, maailmankartta.js: 134 maata).
- Kaupunkikannet: KULTTUURI_KATEGORIAT-avaimet
  js/packs/kulttuuri-kategoriat.js:stä vs. lautojen kaupungit.
- docs/tutki-aiheet.md:n loppuosassa on kirjanpito valmiista maista.

Muista lehtiä tehdessä: kuvat vain PD/CC Commonsista tarkistettuina,
uutislähteet testataan curlilla ennen lisäystä, API-avaimia ei repoon,
`git fetch origin main` juuri ennen versionumeron valintaa
(rinnakkaiset sessiot!), ja Jerusalem on TARKOITUKSELLA ilman
cityCountry-merkintää — älä koske.

## Aloitusprompti uudelle sessiolle

Kopioi tämä uuden tilin sessiolle ensimmäiseksi viestiksi:

> Olet Matkakirja-pelin päätoimittaja täydellä valtuutuksella (roolisi:
> docs/roolitus.md). Lue ensin CLAUDE.md, docs/kapulanvaihto.md,
> docs/tutki-aiheet.md ja docs/isoisan-raamattu.md:n loppuosan
> "AVOIMET PÄÄTÖKSET". Edellinen sessio päättyi kreditien loppumiseen;
> kapulanvaihto.md kertoo tilan (v652) ja säännöt.
>
> Ensisijainen tehtäväsi: jatka maa- ja kaupunkilehtien
> kirjoittamista siitä, mihin jäätiin. Selvitä ensin ajamalla, mitkä
> maat ja kaupungit ovat ilman lehteä (maa-kategoriat.js /
> kulttuuri-kategoriat.js vs. lautojen maat ja kaupungit), ehdota
> minulle seuraava erä (Siperia-erä oli kesken ja katosi — se on hyvä
> ehdokas aloitukseksi) ja tee lehdet docs/tutki-aiheet.md:n
> reseptillä. Julkaise pienissä erissä roolitus.md:n julkaisukaavalla
> ja aja tools/savukkeet/-savukkeet ennen julkaisua.
>
> TÄRKEÄT KIELLOT: matkakirjamerkintöjä (isoisän päiväkirjatekstejä)
> EI generoida — tekstityyli päätetään kanssani erikseen. Kaanoniin
> (tarina.md, isoisan-raamattu.md) ei kirjoiteta ilman minua.
> API-avaimia ei repoon eikä lokiin. Kuvat vain PD/CC tarkistettuina.
