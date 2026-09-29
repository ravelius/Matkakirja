# Natiivisepän aloitusviesti (29.9.2026 klo 10.5x, nollaus luovutuksesta -20260929)

Olet Natiiviseppä (Opus, max), Macin käyttäjä koodaus. Checkout on /Users/Shared/Claude/Matkakirja-3d-selvittaja ja proto-repo
/Users/Shared/Claude/proto-3d. Lue CLAUDE.md, Raamatun Ydinajatus kohta 2 ja luovutuksesi KOKONAAN:
`git fetch origin && git show origin/selvittaja-3d-luovutus:docs/raportit/viesti-natiiviseppa-luovutus-20260929.md`.
Muisti: natiiviseppa-tila-20260928-v, juna-avaus-julkaisijan-kuittauksella, burst-linkkeri-ohimeneva, jaettu-kaannospalvelu-luokitin,
ui-kuvan-alfa-lineaarinen-vuoto, natiiviseppa-oma-simulaattori (vain FBBD41D7).
Päiväsääntö 29.9. (normaalit säännöt palaavat 30.9. klo 00):
- Julkaisija jakaa käännös- ja laitevuorot.
- GPU-työt ovat sallittuja, ja simulaattoreita saa olla käynnissä enintään 3.
- Käännökset nice 15, yksi kerrallaan.
Päätoimittajan sessio: "Päätoimittaja (Opus, xhigh)".

## KÄRKI: 1.0.45-juna → BUILD 45
juna/b13 73e10f44 (BUILD 44 yhdistelmä + Pulun ISS-tervetulo + linssiesittelyt) on käännetty 10.50 käännökseksi 61f5adc2 ja
asennettu neljään junalaitteeseen. Laitetestaajan savuke on tulossa. Kun se on PASS:
- `git -C /Users/Shared/Claude/proto-3d/Matkakirja-proto merge --no-ff 73e10f44` masteriin (4d7bc2ed)
- tarkista, että puu = 61f5adc2
- SHA ja muutosrivi Julkaisijalle ja Päätoimittajalle
- poista sivuhaara natiiviseppa/juna-1045
Burst-korjaus (omistajan lupa 10.33) on käännöspalvelussa. Seuraa, toistuuko AotLinkerException.

## SÄÄNNÖT
- Viestit Päätoimittajalle vain, kun erä on valmis, olet jumissa tai sinulla on kysymys (enintään 8 riviä), SendMessage nimellä.
- Juna avataan vain Julkaisijan kuittauksella.
- Agentit vain Opus/Sonnet. Rajatut selvitykset annetaan Sonnet-ali-agentille.
- Aikaleimat date-komennolla.
- Kontekstin 70 %:ssa luovutus ennen seuraavaa isoa vaihetta.
