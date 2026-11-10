# Natiivi-UI: luovutus 10.11.2026 klo 11.02 (kontekstivahti 26 %; korvaa -20261110-1034:n)

PT local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31, JU local_2a7d6c96-c61c-4887-a4f8-57cc335b40fd, KK local_d5f31591-21fa-4cb0-bab3-bcd3435d075a,
PK (Pelikoodari) local_d3bb1f78-e2ea-4089-8bae-d106bb1f9ff7. Natiivirepo /Users/Shared/Claude/proto-3d/Matkakirja-proto (remote natiivi-backup).
Tarkistus `sh Linssit-testit/unity-tarkistus.sh`. Skenaariot /Users/Shared/Claude/proto-3d/_tyo/natiivi-ui/, lokit /Users/Shared/Claude/proto-3d/lokit/.
Jono: T=/Users/Shared/Claude/Matkakirja-fable/tools/asemataulu/tyolista.py (`seuraava NUI`, `tehty`, `tilanne`).
Kuvat katsotaan sips -Z 1000 / -c rajauksena scratchpadiin.

## PT:N JAKO 11.0x (KK:n suunnitelma /Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261110-kartan-kohteet-kolme-lajia.md)
- A) TEHTY: lista KK:lle /Users/Shared/Claude/proto-3d/_tyo/natiivi-ui/kartan-kohteet-pariisi19-lontoo5-20261110.md (Pariisin 19 aihepistettä:
  Historia 5, Skandaalit 5, Kulttuuri 6, Kauppa 3; Lontoon 5 historian hetkeä; nimi, tunnus, aihe, lat/lon, kohdekartan kohde, kuvat lähteineen).
  19:stä viidellä ON havainnekuva (Tuileries, Vuosisadat, Kirahvi, Mona Lisa, Torni romuraudaksi); Vuosisadat-jutun kuva on kaulanauhajutun.
  Laskin: scratchpadin lista.py (sisältövälimuisti ~/Library/Application Support/Matkakirja/Matkakirja 3D esikatselu/sisalto/, v1045). KK:lle ja PT:lle kerrottu.
- B) PK HOITAA: nimen napautus → zoomaus. PK teki saman rinnakkain: bdae03fd6 (pelikoodari/nimi-zoomaus-224, ajo lokit/pk-nimi-zoomaus-bdae03fd6).
  NUI:n oma b6cf108aa (natiivi-ui/kaupunkinimi-zoomaus, worktree /Users/Shared/Claude/wt/proto-nui-nimizoom) on lähes identtinen → EI KÄYTETÄ;
  JU:n ajopyyntö peruttu, PT:lle ja PK:lle kerrottu. Lisäkaupunkien (Lyon ym., kohde:nakyva-kaupunki-*) nostokortti jäi kummassakin ennalleen.
  Skenaario sk-kaupunkinimi-zoomaus-1-mac.txt jäi PK:n käyttöön tarvittaessa.
- C) KK:LLÄ: Lehti + Turisti-info -napit kuvana: /Users/Shared/Claude/proto-3d/_tyo/natiivi-ui/lehti-info-napit/napit-iphone-pari.png (nykyinen | ehdotus,
  iPhone). Suositus: kaksi pergamenttinappia (kuvake + teksti) nimikilven "Pariisi ▾" alle oikeaan reunaan; vasen alakulma pienoiskartalle
  (katkoviiva-arvio) ja peukalorenkaalle. Piirtoskripti scratchpadin napit.py. EI KOODIA ennen KK:n sanaa. KK:n vastaus → koodi (napit kaupunkinäkymään:
  Lehti = LueLehti, Turisti-info = Avauskortin turisti-info-arkki) → Mac-pari PT:lle.
- D) Osa 4 kaupungin luettelo (Nähtävyydet, Kadonneet, Tarinapaikat) vasta kun KK:n luokittelu (osa 3) valmis. E) Osat 5–6 myöhemmin PT:n vuorolla.

## NOSTOLUETTELO (Kaupungit-kärki)
- KAUPUNGIT-3 AJOSSA: JU ajaa sk-nostoluettelo-kaupungit-3-mac → lokit/nui-nostoluettelo-kaupungit-3-mac-761535b9e (kansio oli 11.01 vielä tyhjä).
  Tarkista: q-1 PARIISI-otsikko + "‹ Ranska", kategorioissa EI "Muut"; q-2 maan taso Kaupungit, Nähtävyydet, Kadonneet ihmeet (≥ 11) toisena;
  q-3 ihmeet auki; q-4 MARSEILLE + "‹ Kaupungit". Kuvat PT:lle (≤ 3 riviä) → PT:n sanalla MR JU:lle: natiivi-ui/nostoluettelo-kaupungit 761535b9e
  (ILMAN PR 6553:a). Sitten `tehty "Nostoluettelo: Kaupungit-kohta ja jaottelu"`. Lontoon Muut-tarkistus puuttuu skenaariosta (lisää tarvittaessa).
- PR 6553 PIDOSSA (draft): ei yhdistetä, ei viedä; sulkeminen vain PT:n sanalla.
- KADONNEET-VIKA 0fb0ebfae: JU:n jonossa junaan 224. Ei toimia.

## 2. KLIKATTAVAT ESITTELYNÄ (3edc0a5e5, natiivi-ui/klikattavat-esittelyt) — ajo katsottu, AVOIN
JU:n ajot lokit/nui-klikattavat-1-{pariisi,lontoo}-mac-3edc0a5e5 (Mac iphone, rc 0): KUOLLUT 0; "tietokortti (ei kirjoitettua esittelyä)"
-rivit ovat TOISEN kaupungin kylttejä (Pariisissa Lontoon, Lontoossa Pariisin; omassa kaupungissa esittely) → ei sisältöpuutetta (PT:lle kerrottu).
AVOIN: `ui klikattavat napauta tavallinen` → "ei näkyvää merkkiä" molemmissa, eli b-1/b-2 eivät todista korjausta (tavallinen nosto
palkkina + kierto). Listassa ei ole yhtään tavallista nostoa merkkinä: selvitä, näkyvätkö kohdekaupungin tavalliset nostot (skandaalit,
hetket) NostotKartalla.merkit-listassa kaupunkizoomissa lainkaan (KaupunginNosto: Kohdenostot.Lahella + NostonLento.KaupunkiNostolle).
Jos eivät näy → korjaus on tarpeeton tällä tasolla, kerro PT:lle; jos näkyvät muualla → skenaarioon kamera sinne ja uusi ajo. Sitten `tehty`.

## 3. MUUT JONOSSA (koodattu, JU:n Mac-ajot jonossa; ohjeet luovutuksessa c72f50268 kohdat 2–5)
Museon latausilmaisin 37eba712e, kerronnan tauko a8bfc9d3e, maan pienoiskartta 5d01e2c25, kuvakyltti 153602c0f (koe, ei junaan ilman korttia).

## AVOIN EDELLISESTÄ
- Lyhyt versio 14877fa07: JU:n iPad-☰-kuva linkistä 224.7 katsomatta → katso, kun JU lähettää.

LISÄTIETO kohtaan 2 (klikattavat, 11.0x koodista): ajossa Pariisin merkeissä oli vain kohdenostoja. Tavallinen nosto (karttavalo, kaupunki null, pääkartalla)
on NostoKerroksen Naytettavat-listassa vain, jos se ei ole jo kohdenosto (Kohdenostona = linkitetty kohdekartan kohteeseen, esim. Mona Lisa → Louvre).
Pariisin 19 aihepisteestä 14 on linkitetty kohdekartan kohteeseen (ks. A:n lista; kolme kartalla olevaan, 11 tarinakohteeseen) – EI VARMISTETTU, piilottaako
Kohdenostona (NostoKerros.cs 695/801) myös tarinakohteisiin linkitetyt; 5 maalehti-nostoa (Braille, Meister, Tour 1903, Roland Garros, Bouquinistes) eivät ole linkitettyjä. Tarkista seuraavaksi, näkyvätkö ne kaupunkizoomissa (muste/salaisuus, taso, katto).
Kohteet saattavat muuttua KK:n luokittelussa (osa 3), joten kysy PT:ltä ennen uutta ajoa.
