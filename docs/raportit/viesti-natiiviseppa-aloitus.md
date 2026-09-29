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

## KÄRKI: 1.0.48-juna → BUILD 48
juna/b13 c1117fe9 = master 329ffaf0 (BUILD 47) + natiivi-ui/pelaajan-nakyma 9652f810 (kehittäjän maailmatilan silmänappi). Juna avattiin
12.0x Julkaisijan luvalla, testit exit 0 (0/401/357/425), ja vahti kääntää sen Linnanrakentajan jälkeen. Seuraa juna.logia
(KÄÄNNETTY/VIKA). Sitten Laitetestaajalle savuke (maailmatila, silmänappi, himmeät kaupungit ja maailmahyppy) → PASS → BUILD 48 =
`git -C /Users/Shared/Claude/proto-3d/Matkakirja-proto merge --no-ff c1117fe9` masteriin (329ffaf0). Tarkista, että puu = käännös,
ja lähetä SHA:t. Poista sivuhaara natiiviseppa/juna-1048.
Seuraavaksi tulee Linssiseppä 2:n avaruuskävelyn merge-pyyntö 1.0.48:aan (Päätoimittaja). Kokoa se sivuhaaraan, testaa ja lisää junaan
Julkaisijan luvalla. Jos 1.0.48 on jo savukkeessa, avaruuskävely menee 1.0.49:ään. AstronautinNakyma.cs:ssä on triviaali ristiriita
Pulun taulun kanssa: pidä molemmat.
TF: VIE annettiin vain 1.0.47:lle (329ffaf0), koska se sisältää 1.0.45:n ja 1.0.46:n. Vie aina oman BUILDin SHA:lla.
Burst-korjaus on todennettu: ajastin ohitti 12.01 jonon aikana käännetyn junan.

## SÄÄNNÖT
- Viestit Päätoimittajalle vain, kun erä on valmis, olet jumissa tai sinulla on kysymys (enintään 8 riviä), SendMessage nimellä.
- Juna avataan vain Julkaisijan kuittauksella.
- Agentit vain Opus/Sonnet. Rajatut selvitykset annetaan Sonnet-ali-agentille.
- Aikaleimat date-komennolla.
- Kontekstin 70 %:ssa luovutus ennen seuraavaa isoa vaihetta.
