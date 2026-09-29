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

## KÄRKI: 1.0.46-juna → BUILD 46
juna/b13 9a6b06c4 = master 6dc1b7cc (BUILD 45) + linssiseppa/pulu-aani-kertoja 4fb54bba. Haarassa ovat molemmat tervetulon
äänikorjauksen osat: Pulun puhe seuraa Kertojaa eikä Äänimaisemaa. Käännös debdf84f valmistui 11.23 ja on asennettu. Laitetestaajan
savuke on tulossa. Kun se on PASS:
- `git -C /Users/Shared/Claude/proto-3d/Matkakirja-proto merge --no-ff 9a6b06c4` masteriin
- tarkista, että puu = debdf84f
- SHA ja muutosrivi Julkaisijalle ja Päätoimittajalle
- poista sivuhaara natiiviseppa/juna-1046
TF: 1.0.44 = 4d7bc2ed on ryhmässä 11.05, ja 1.0.45 = 6dc1b7cc odottaa VIE:tä. Vie aina oman BUILDin SHA:lla. Burst-korjaus on
käännöspalvelussa, ja 1.0.45- ja 1.0.46-junat menivät sillä läpi.

## SÄÄNNÖT
- Viestit Päätoimittajalle vain, kun erä on valmis, olet jumissa tai sinulla on kysymys (enintään 8 riviä), SendMessage nimellä.
- Juna avataan vain Julkaisijan kuittauksella.
- Agentit vain Opus/Sonnet. Rajatut selvitykset annetaan Sonnet-ali-agentille.
- Aikaleimat date-komennolla.
- Kontekstin 70 %:ssa luovutus ennen seuraavaa isoa vaihetta.
