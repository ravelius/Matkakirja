# BUILD 34 puhe-PASS (Laitetestaaja, 28.9.2026 klo 00.3x)

proto-master 17c2928b (tag build34) = BUILD 33 edf03bfd + pelikoodari/puhetagit 9fac9748.
Ancestor OK. Julkaisulippu `/tmp/matkakirja-julkaisu` päällä ajon ajan, poistettu perään.
iPhone 18 Pro (1572C658). **0 poikkeusta.**

## Tulokset

1. **Kappalejako [pause]: PASS.** `ui nosto skandaali:shakkiturkkilainen` (säilötty), koko artikkeli
   luettu läpi ~10 kappaletta keskeytyksettä. JOKAISEN kappaleen loppuun ilmestyi `[pause]`
   puhepyynnön TEKSTISSÄ (esim. `kertoja||1.15|...eikä kukaan pysty osoittamaan. [pause]`),
   paitsi kun seuraava virke jatkuu samassa "palassa" ilman kappaleenvaihtoa — johdonmukaista
   koko artikkelin ajan, ei yhtään puuttuvaa/ylimääräistä tagia havaittu.
2. **Ei tagitekstejä näkyvässä tekstissä: PASS.** Ruudulla näkyvä kappaleteksti ("Paras huijaus
   on se, jonka kaikki aavistavat eikä kukaan pysty osoittamaan.") EI sisällä `[pause]`-merkkiä —
   tagi on vain TTS-pyynnön sisäisessä tekstissä.
3. **Luenta ilman ohituksia: PASS, vahva näyttö.** Kaikki palat (`pala 1/2`, `pala 2/2`)
   onnistuivat (worker generoitu/reuna 200), siirtymät kappaleesta kappaleeseen saumattomia
   (osa välimuistista 16-18 ms, ei viivettä), luenta jatkui itsestään aina artikkelin loppuun
   ("Turkkilainen paloi 5. heinäkuuta 1854...") asti.
4. **Väliotsikon [long-pause]: EI TODENNETTU.** Testiartikkelissa (Skandaalit-lisälehti) ei ollut
   mid-artikkelin väliotsikkoa tässä kierroksessa — ei näyttöä [long-pause]-tagista puolesta
   eikä vastaan. Jos tarpeen, tarvitsen artikkelin JOSSA on väliotsikko keskellä tekstiä.
5. **Pulun persoonatagi ("pollo"): EI TODENNETTU.** `ui pulu sano` (kaava käyttää valmiiksi
   säilöttyä Livia-tekstiä, ei uutta xAI-kulutusta) palautti aina "→ ok" lokissa, mutta EI
   koskaan tuottanut näkyvää `puhe: alkoi ... pollo||...`-riviä — kokeilin sekä kesken kertojan
   luvun että sen jälkeen, sekä `puhe pois`/`aanet`-tiloissa. Epäilen Pulu-widgetin näkyvyys-
   ehtoa (`pulu.Nakyvissa`) tai että komento vaatii jonkin toisen UI-tilan (esim. chat auki) —
   en löytänyt oikeaa polkua ajan puitteissa. Ei varmistettu, EI merkitty FAILiksi.

## Yhteenveto Julkaisijalle, Fablelle ja Natiivisepälle
**PASS pääkohdista (1-3): kappalejako, tagit piilossa näkyvästä tekstistä, luenta ilman ohituksia
kaikki vahvistettu lokista, 0 poikkeusta.** Kohdat 4 (väliotsikon long-pause) ja 5 (Pulun
persoonatagi) EIVÄT TODENNETTU tällä kierroksella — ei löydöstä, vain testaamatta. Jos näitä
pitää varmistaa ennen julkaisua, kerro miten Pulu/väliotsikko saadaan esiin testiin.
