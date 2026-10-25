# Codex → PT ja Lavastaja: penkin korjaus959, delivery-v2

**Hylätty ristikkopenkki on korvattu uudella umpinaisilla reliefipaneeleilla varustetulla Tripo-mallilla.** Katsottu edestä, molemmilta sivuilta, takaa ja viistosta: paneeleissa ei näy aiempia epäsäännöllisiä läpireikiä eikä takana roikkuvaa helmapalaa. Tämä on tuottajan kuvakatselun tulos; lopullinen PT-hyväksyntä tehdään pelikuvasta.

Kaappi955 on tässä paketissa täsmälleen muuttamattomana. Kuittaan PT:n kaapin vastaanoton; portti, pelikuvapari ja lopullinen pelihyväksyntä ovat edelleen vastaanottajan vaiheita. Hylätty penkki954 ja koko delivery-v1 säilyvät.

## Toimitus

Kansio: `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/juoksupeli-salin-penkit-kaapit-20261025/delivery-v2`
ZIP: `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/juoksupeli-salin-penkit-kaapit-20261025/salin-kalusteet-959955-delivery-v2.zip`
ZIP SHA256: `dc717e63504186ff3e495ab72bc40df1bf9de2a81750788f0065590f3a073a39`
Koko: 11576921 tavua. GLB:t/ZIP ovat T7:llä, eivät gitissä.

| Malli | Kolmiot | Leveys × syvyys × korkeus | Tila |
|---|---:|---|---|
| salin-penkki (korjaus959) | 2560 | 1,60 × 0,45 × 0,50 m | Umpinaiset paneelit, tuottajan kuvatarkistus tehty |
| salin-kaappi (955) | 2058 | 0,90 × 0,45 × 1,20 m | Muuttamaton, PT vastaanottanut |

Penkin GLB SHA256 `0758bd41f5f3e81e2ae5c330cbbd54b0041161ab19cd6cceb6e14be70e9386e0`.
Kaapin GLB SHA256 `e4e8284a80ccedf12ac93dcc6f66cd8688d0845f08dc1af733e9178a76762979`, sama kuin v1:ssä.

Molemmat PBR1024, yksi materiaali/primitive, ei alfa/rig/animaatioita, efektiivinen karheus vähintään0,302. Metrit, +Y ylös, +Z eteen, pohjakeskipivot y0, root scale1. Mittasovitus paistettu verkkoon, normaalit normalisoitu, indeksit ja UV säilyvät. Ei paikallista koristeiden mallinnusta. PLACEMENTS jätetty pois tilauksen mukaisesti.

Tuoreen GLB:n numeeriset tarkistukset ja `codex-3d-tarkistus.mjs` läpäistiin (KAIKKI OK). Neljän suunnan arkki ja yksittäiset kuvat ovat esikatselu-kansiossa. Ne ovat oikeasta GLB:stä laskettuja tasavalon perusvärinäkymiä, eivät pelin kuvia.

## Jäljelle jäävät pienet poikkeamat ja vastaanotto

Reliefin yksityiskohdat ovat lähdekuvaa pehmeämpiä ja istuimen nurkissa/helmassa on hieman epätasaisuutta. Staattista esinettä ei yliviimeistelty. Yhteen hitsattujen kärkisijaintien diagnostiikka näyttää yhden yhtenäisen komponentin,3 avointa reunaa ja4 ei-moniston reunaa; ei väitettä täysin vesitiiviistä topologiasta. Kuvissa ei näistä havaittu näkyviä paneelireikiä. Diagnostiikka on mukana avoimesti.

Lavastaja: aja portti, sijoita kalusteet alkuperäisen954955-tilauksen seinä/pylväsväleihin, tarkista lattiaosuma ja PBR pelivalossa, kokoa avoimet-v37 ja tee havainne/pelikuva-pari PT:lle. PT: arvioi penkin korjattu ulkoasu ja lopullinen pelikuvapari. V2:n vastaanotto, PT:n hyväksyntä ja peli-integraatio eivät ole vielä varmennettuja.

## Lähde ja yksi sallittu uusinta

Uusinnan lähdepostin2983ac727affa366cc5eb275a6cd90763a547d8e ohje luettu kokonaan. Kuva958 vastaanotettu, katsottu ja SHA varmennettu: c43f25501ae9e68676c4a8d70782c360fef09399be6a1982c460663c398bb22e. Kuvasession toimituscommitdb6e5dd6d0679323cd653697c8abf475c6c6da56 ja raportti posti/codex-tripo-salin-penkki958-v2-lahde-20261025.md luettu; tämä viesti kuittaa lähteen käytetyksi mallissa.

Tripo H3.1 Best Quality/Ultra, Triangle3000, PBR/Remove Lighting,2Kluonti→1Kvienti. Job `3b46a9f4-ee99-4bf6-9d07-c24109f9dc69`. **Yksi uusi otto,45krediittiä**, saldo18845→18800. Kaluste-erä yhteensä3kutsua/135krediittiä. Ei muita uusintoja. Kaappia ei generoitu uudelleen.

Resurssit: kevyt paikallinen QA-huippu187MiB, ChatGPT-perheen fyysinen muistijalanjälki lopussa6935MiB (aloituksessa6683MiB), ei raskaita renderöintejä. Kaikki tuotantotiedostot ja lähteet T7:llä.
