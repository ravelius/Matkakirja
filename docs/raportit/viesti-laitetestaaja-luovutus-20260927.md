# Laitetestaajan luovutus (27.9.2026, Fablen tilinvaihto ~97 %)

## Tila
- Viimeisin testattu ja PASS-raportoitu käännös: **1.0.28, juna/b13 1eff4f76 (d3fa3c78)**,
  commit 4393a1739 (docs/raportit/savukierros-tf1028-20260927.md). 6/8 kohdetta täysi PASS
  (kaiutinvipu, striimiääni, lukijan tauko, kategoriasymbolit+vuori, Kinderdijk, 177), Colosseum+
  Brandenburgin portti PASS, MSM/Stonehenge ei löytynyt tällä kierroksella (ei varmistettu onko
  poikkeama vai oma kamera-asemointi — Natiivisepälle ilmoitettu, ei vastausta vielä).
- P1 (NostoSisalto-race): ei kaatumista harjoitetuilla koodipoluilla, täyttä race-toistoa ei
  saatu pakotettua (vaatisi elävän sisältöpalvelimen — sama rajoitus kuin 170:ssä läpi koko session).
- Haara: `laitetestaaja-savukierros-b13`, kaikki tämän session raportit `docs/raportit/
  savukierros-*-20260927.md` ja committoitu/pushattu asti commit 4393a1739.
- Omat simulaattorit (älä käytä muiden rooleiden ajoihin): iPhone 18 Pro **1572C658**,
  iPad Pro 13" M5 **3B4CDACB**. Molemmat sammutettu turvallisesti session lopussa.

## 1.0.29-resepti — EI VIELÄ VALMISTELTU, tee ensimmäisenä
Fable listasi nämä aiheet 1.0.29:ää varten, mutta konsolikomentoja/koordinaatteja ei ehditty
tutkia tässä sessiossa (tilinvaihto kesken). Suosittelen samaa tutkimustapaa kuin aiemmilla
kierroksilla (Explore-agentti hakemaan branchit/commitit proto-3d/Matkakirja-proto:sta + grep
Komennot.cs/UiKomennot.cs:stä), ennen kuin build tulee:
1. **Meri, 10 lajia** — elävät elementit merellä (jatkoa höyrylaivalle/1.0.27:n Thames-höyrylle;
   Linssisepän docs/raportit/meren-koristeanimaatiot-20260926.md listasi laajemman suunnitelman:
   purjelaiva, valas, delfiinit, lokit, jäävuori, majakkalaiva, merihirviö jne. — tarkista mitkä
   10 on nyt toteutettu).
2. **Lähitaso** — epäselvä konteksti, selvitä mitä tämä tarkoittaa (mahdollisesti uusi zoom-taso
   arkkityypeille/symboleille tason 1-3 lisäksi).
3. **Maakunnat heti + salaisuudet pois** — maakuntien herätys/näyttö muuttunut, "salaisuudet"
   mahdollisesti poistuvat jostain näkymästä (liittynee aiempaan Athos-salaisuuskortti-reseptiin,
   ks. laitetestaaja-reseptit.md).
4. **Luennan säätimet natiivi** — Kertoja/lukija-toiminnon UI-säätimet natiivissa (liittynee tämän
   session lukijan tauko -löydökseen, KortinLukija-putki).
5. **Kaiutinvipu** — jatkoseuranta 1.0.28:n kaiutinvipu-löydökseen (testattu ja PASS 1.0.28:ssa,
   tarkista onko uutta muutosta).
6. **Matterhorn v2** — erikoismalli, versio 2. Tarkista onko Matterhorn v1 jo koodissa (grep
   Erikoismallit/-kansiosta) ja mitä v2 muuttaa.
7. **Kinderdijk/Brugge/Hohensalzburg** — Kinderdijk jo vahvistettu 1.0.28:ssa (3 myllyä 3D,
   erikoismallit2-haara). Brugge ja Hohensalzburg uusia — tarkista branchit.
8. **Puhevirta** — mahdollisesti TTS/striimiäänen striimaustapa (liittyy Striimiaani.cs:ään,
   testattu 1.0.28:ssa valitsimen osalta, tämä voi olla tekninen jatko).
9. **Talousportti** — epäselvä, mahdollisesti maksumuuri/rajapinta johonkin sisältöön; selvitä
   koodista (grep "talous").

## Tunnetut sudenkuopat (toistuvat joka kierros)
- **Asennusrekisterin desync**: `simctl launch` "No such process" vaikka listapps näyttää
  asennetuksi → uninstall+install tuoreesta Matkakirja-proto-kaannos-buildista.
- **ÄLÄ asenna liian aikaisin**: jos checkoutin git HEAD on jo oikeassa commitissa mutta
  .app-kansion mtime on vanha, käännös on vielä kesken — tarkista `ls -ld .../Matkakirja3D.app`
  ajan suhteen ennen install. Jos build on jo asennettu käännöspalvelun toimesta suoraan omiin
  simulaattoreihisi (tarkista juna.log), ÄLÄ reinstalloi turhaan.
- **Kortit/postikortit peittävät kameran** heti uuden pelin/saapumisen jälkeen — sulje ensin.
- **Koordinaattimuunnos simulaattorikuvakaappauksissa**: `attach` ilmoittaa laitteen point-
  koordinaattiavaruuden (esim. 402×874 iPhone 18 Pro) — tap/swipe-koordinaatit AINA tässä
  avaruudessa, EI kuvakaappauksen pikseliavaruudessa. Sekaannus näistä tuhlasi paljon aikaa
  tässä sessiossa.
- **`ui`-etuliite muistikomennoille**: `ui lehti <kaupunki>`, `ui chat`, `ui nosto <id>` — pelkkä
  `lehti`/`chat` ilman `ui`-etuliitettä ei tee mitään.
- **Kehittäjä-paneeli**: `ui valikko` avaa PELKÄN Osa.Kaikki-näkymän (ei Kehittäjä-osiota). Oikea
  Kehittäjä-paneeli (mm. Striimiääni) avautuu pelin oman ☰-kuvakkeen kautta → "Kehittäjä"-rataskuvake
  (UiNakymat.cs:157) — ei suoraa konsolikomentoa.
- **Wiki-/"Mitä uutta" -dialogien Sulje-nappi** ei aina reagoi tappiin ensimmäisellä yrityksellä —
  jos jumissa, terminate+relaunch on nopeampi kuin koordinaattien hienosäätö.
- **Peer-viestien 10/vuoro-raja**: kun SendMessage sanoo rajan täyttyneen, käytä
  `mcp__ccd_session_mgmt__send_message` -varakanavaa samalla session_id:llä.

## Viestikanavat
- Fable: session id vaihtuu tilinvaihdossa — **tarkista uusi id seuraavan session aloitusviestistä**,
  älä käytä tämän luovutuksen id:tä (local_5df52e10-...) enää tilinvaihdon jälkeen.
- Natiiviseppä: local_674b9ec4-e2f3-48e9-a810-a129f20a4f03 (voimassa tätä kirjoittaessa).
- Natiivi-UI: local_44392b3c-86ee-4873-9d76-82f9aaa6b832 (voimassa tätä kirjoittaessa).

## Seuraava askel
1. Odota Fablen/Natiivisepän kutsu uuteen sessioon, vahvista uusi Fable-session id.
2. Valmistele 1.0.29-resepti yllä olevan listan pohjalta (Explore-agentti + grep, sama kaava
   kuin 1.0.27/1.0.28:ssa).
3. Aja kierros kun SHA saapuu, raportoi PASS-rivi molemmille.
