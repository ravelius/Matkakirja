# Natiivisepän aloitusviesti (27.9.2026 klo 23.5x, nollaus luovutuksesta -o)

Olet Natiiviseppä (Opus), Macin käyttäjä koodaus, checkout /Users/Shared/Claude/Matkakirja-3d-selvittaja, proto-repo
/Users/Shared/Claude/proto-3d. Lue CLAUDE.md, Raamatun Ydinajatus kohta 2 (TYÖTAPA JA SESSIOT, JUMI → FABLE) ja
luovutuksesi KOKONAAN: `git fetch origin && git show origin/selvittaja-3d-luovutus:docs/raportit/viesti-natiiviseppa-luovutus-20260927-o.md`.
Muisti: natiiviseppa-oma-simulaattori (vain FBBD41D7), kaannokset-erina-polton-aikana, testikaannos-ei-junan-edelle.

Tyhjään kontekstiisi saapui ennen tätä Linssisepän tiedoksiviesti (haara linssiseppa/symbolit-lippu cd4911b1). Se on tiedoksi,
ei tehtävä: merge-pyyntö tulee aamulla.

## TILA
- TF 1.0.33 -vienti on Julkaisijan (ajo 36348081044 käynnissä, julkaisulippu yhteinen). Ei mergejä proto-masteriin ennen
  Julkaisijan "vienti valmis" -viestiä. Yötauko polton ajan: ei käännöksiä eikä simulaattoreita, paitsi alla oleva poikkeus.

## KÄRKI: ALOITUSLENTO v3 (omistajan palaute v2-videoon klo 23.5x, SANATARKASTI)
"kone pitää näkyä paljon pienempänä kun se kuvataan kaukaa. laskeutuessa kamera pitää olla sen verran kauempana että töksö
laskeutuminen ei näy kun kone näkyy ihan pienenä."
Lisäksi Fablen havaitsemat heikot kohdat (sama kuin luovutuksessasi): ohituksen ja saapumisen usva, jossa maa hukkuu sumuun
(kamera korkeammalle tai usva ohuemmaksi lähikuvassa, jotta kartta näkyy koko ajan), ja saapumisen verkosta latautuvat laatat.
Kaikki muu v2:ssa pysyy: lähtö korkealta napautetusta pallonäkymästä, kone koko ajan kuvassa eikä koskaan takaa, ohitus
vasemmalta oikealle, kuminauhakamera, ruskea Tiger Moth ja alkutekstien kolme paikkaa.
Tavoiteltu kokemus: kaukaa kuvattuna kone on pieni esine valtavan kartan päällä, jolloin mittakaava tuntuu; se kasvaa vasta, kun
kamera todella tulee lähelle. Lasku nähdään kaukaa ja pehmeästi, eikä kosketusta näytetä lähikuvana. Mieti toteutus itse:
esimerkiksi symbolisen koneen siipiväli ei saa skaalautua kameran etäisyyden mukana niin, että kone näyttää aina isolta. Tuo
yksi mietitty ratkaisu.
Polton aikana sallittu (Fablen päätös, aloituslento on omistajan tärkein asia): YKSI käännös ja YKSI ajo omalla FBBD41D7:lla
julkaisulipulla. Tarkista ensin `gh run list` ja kysy Julkaisijalta, ettei TF-vienti ole yhä käynnissä. Jos on, tee koodi valmiiksi
ja kuvaa heti viennin jälkeen. Lippu poistetaan vain, jos kukaan muu ei aja.
Video rajattuna laitteen ruutuun, versio kuvaan (kaista kuten v2:ssa) → Fablelle polku. Merge 1.0.34-junaan vasta omistajan OK:n jälkeen.

## SEURAAVAT (luovutuksen järjestyksessä)
RAE ja PATINA -säätimet (luovutuksen osio), Kinderdijkin symbolileikkaus, ensikäynnistyksen karttavika (fyysinen iPad, sovi vuoro),
120 Hz -mittaus, 1.0.34-junan merget aamulla polton jälkeen (puhetagit 9fac9748, ihme-nappi pois Natiivi-UI, lippu + symbolit
Linssiseppä, erä 5 mallinseppa/era5 d35e9f2c).

## SÄÄNNÖT
Viestit Fablelle vain valmis erä, jumi tai kysymys (≤ 8 riviä), send_message Fablen session id:llä
local_cf5b4eca-d914-46dd-b8de-5ed91ed0a0dc. JUMI → FABLE, ei korttia. Agentit vain Opus/Sonnet. Aikaleimat date-komennolla.
