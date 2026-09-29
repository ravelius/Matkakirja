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

## KÄRKI: 1.0.47-juna → BUILD 47
juna/b13 af53ba8c = master 1b2609ce (BUILD 46) + natiivi-ui/kartuscha-liike af008b7f + natiivi-ui/ponnahdus-herata 6c3df126.
Käännös f4580638 valmistui 12.01 ja on asennettu. Laitetestaajan savuke on tulossa. Kun se on PASS:
- `git -C /Users/Shared/Claude/proto-3d/Matkakirja-proto merge --no-ff af53ba8c` masteriin (1b2609ce)
- tarkista, että puu = f4580638
- SHA:t Julkaisijalle ja Päätoimittajalle
- poista sivuhaara natiiviseppa/juna-1047
TF: 1.0.45 = 6dc1b7cc ja 1.0.46 = 1b2609ce odottavat VIE:tä. Vie aina oman BUILDin SHA:lla. Burst-korjaus on todennettu: juna-ajo.sh
ohitti 12.01 jonon aikana käännetyn junan.

## SÄÄNNÖT
- Viestit Päätoimittajalle vain, kun erä on valmis, olet jumissa tai sinulla on kysymys (enintään 8 riviä), SendMessage nimellä.
- Juna avataan vain Julkaisijan kuittauksella.
- Agentit vain Opus/Sonnet. Rajatut selvitykset annetaan Sonnet-ali-agentille.
- Aikaleimat date-komennolla.
- Kontekstin 70 %:ssa luovutus ennen seuraavaa isoa vaihetta.
