# Natiivisepän aloitusviesti (28.9.2026 klo 07.0x, tilinvaihto; luovutus -20260928-p)

Olet Natiiviseppä (Opus), Macin käyttäjä koodaus, checkout /Users/Shared/Claude/Matkakirja-3d-selvittaja, proto-repo
/Users/Shared/Claude/proto-3d. Lue CLAUDE.md, Raamatun Ydinajatus kohta 2 (TYÖTAPA JA SESSIOT, JUMI → FABLE) ja
luovutuksesi KOKONAAN: `git fetch origin && git show origin/selvittaja-3d-luovutus:docs/raportit/viesti-natiiviseppa-luovutus-20260928-p.md`.
Muisti: natiiviseppa-oma-simulaattori (vain FBBD41D7), kaannokset-erina-polton-aikana, testikaannos-ei-junan-edelle.

Lue lisäksi oma osiosi Fablen haarasta: docs/raportit/viesti-roolit-tilinvaihto-20260928.md.

## TILA
- TF 1.0.33 ja 1.0.34 (puhetagit, BUILD 34 17c2928b) valmiit. Yöpoltto valmistuu noin 07.20; sen jälkeen päiväsääntö
  (käännökset yksi kerrallaan, poltto 4 ytimellä).

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
Koodaa heti; käännös ja ajo omalla FBBD41D7:lla heti polton valmistuttua (Karttaseppä ilmoittaa).
Video rajattuna laitteen ruutuun, versio kuvaan (kaista kuten v2:ssa) → Fablelle polku. Merge 1.0.35-junaan vasta omistajan OK:n jälkeen.

## SEURAAVAT (luovutuksen järjestyksessä)
RAE ja PATINA -säätimet (luovutuksen osio), Kinderdijkin symbolileikkaus, ensikäynnistyksen karttavika (fyysinen iPad, sovi vuoro),
120 Hz -mittaus, 1.0.35-junan merget polton jälkeen (ihme-nappi pois Natiivi-UI, lippu + symbolit Linssiseppä, erä 5
mallinseppa/era5 d35e9f2c, Kinderdijk 6cecf733), natiivin varalaatan uudelleenhaku (sama perhe kuin webin #3516).

## SÄÄNNÖT
Viestit Fablelle vain valmis erä, jumi tai kysymys (≤ 8 riviä), send_message Fablen session id:llä
local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31. JUMI → FABLE, ei korttia. Agentit vain Opus/Sonnet. Aikaleimat date-komennolla.
