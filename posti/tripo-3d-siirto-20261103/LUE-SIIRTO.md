# Omistajan siirto: palatsin pronssit sekä arkiset hahmot Tripo 3D -sessiolle

Omistajan suora pyyntö 3.11.2026: ”siirrä ne 3d tilaukset tripo 3d sessiolle”. Kohdesessio: 01a14ee0-3e23-72b2-82b1-510228c70b7d. Kuvasessio01a06e21 ei jatka näiden3D-tuotantoa. Pariisin2D-kartta jää kuvasessioon.

## 1. Pronssit: jo toimitettu, ei kaksoistuotantoa
Lavastajan2.11.klo21.19 alkuperäistilaus mukana.9 ulkoasumallia+2 suljettua törmäysmallia toimitettu commit644c30101491f52b6a51ea91d2d397223c4f3bcd kansioon posti/palatsin-pronssit-20261102/. SHA256SUMS418bbb320d73df70dead2121275448c38f516ab8d5e0c8deb42af95185731229. Vastaanotto posti/lavastaja-codex-palatsin-pronssit-kuittaus-20261103.md commit4d33570c2:42/42 täsmää,9+2 hyväksytty,42 instanssia8 ryhmään sijoitettu. Mahdolliset uudet rajatut korjaukset Tripo-sessiolle. Lopullinen PT/omistaja/pelijulkaisu ei tällä vahvistu.

## 2. Arkiset hahmot: paikalliset keskeneräiset ehdokkaat, EI pelitoimitus
Alkuperäistilaus2.11.klo21.07 sekä klo21.17 lakaisija/fill-lisäys mukana samassa lähdetiedostossa. Neljä hahmoa ja seitsemän tavara-/jäännemallia. Työjuuri output/arkiset-hahmot-20261103/. Kaikki jaettu samalla T7:llä, polut ja tarkistussummat LOCAL-ASSET-SHA256.jsonissa.

- delivery/ sisältää4 animaatioehdokasta, EI toimitettuja malleja. rest-models/ sisältää7 erillistä tavaraa/jäännettä sekä levossa olevat hahmot ja Blender-lähteet.
- build_assets.py tekee uudet työvaatteet ja tavarat omalle korjatulle65-luiselle ihmisrungolle. animate_assets.py tekee liikkeet. Riippuvuudet output/juoksupeli-liikkeet-20261027/tools/rig_helpers.py ja limb_reference_ik_v2.py. Pythonympäristö output/pariisi-lukittu-2029-koepala-20261102/registration/.venv/bin/python. Blender /Applications/Blender.app/Contents/MacOS/Blender.
- Kasvot/kädet/kengät ovat omista rear-source-v2-malleista, lähteet jaSHA:t sources/SOURCE-REFERENCES.jsonissa. Ei uusia Tripo- tai ImageGen-kutsuja hahmoille. Kyse on Blender-ehdokkaista, ei Tripo-valmistuloksista.
- qa-numeric.json on viimeisin11GLB:n numerotarkistus: kolmiot≤20000/3000, maataso, silmukoiden jatkuvuus ja erillinen tavara-solmu läpäisivät. Kaikilla65 nimettyä luuta ja sama hierarkia. Tavaran irrotus0.40s; startle1.0s. Fill2.6s, sweep2.0s. Pelissä tavara-preview-kanavat korvataan tarvittaessa fysiikalla; luuranko jatkuu. Empty-leikkeet piilottavat upotetun tavaran.
- TÄRKEÄ KESKENERÄINEN KOHTA: vedenkantajan fill-kallistus on viimeisessä kokeessa -90° ja suu osoittaa väärään suuntaan. Tätä EI saa hyväksyä. Edellinen+60° jätti kaatoreunan noin1.04m korkeuteen ja liian lähelle hahmoa. Korjaa liike oikeasti1.1m korkean,1.6m leveän vesiastian viereen: suu astiaan, kädet/olkapuu/roput yhtenäisinä, ei törmäystä. Mahdollinen vartalon kumarrus ja eteen siirto on vasta idea, EI toteutettu tai hyväksytty. Pronssinen astiaversio on jo toimitetussa pronssipaketissa.
- qa-integration-contract.jsonin vedenkantajanSHA ja fill-mittaus ovat VANHENTUNEET ennen viimeistä -90° koetta. Muut tiedot vastaavat aiempaa tarkistusta; aja koko integraatio-/kuvaQA uudelleen lopullisille malleille.
- Pitkien kaapujen läpi näkyneet housut on jo korjattu: vain nilkkamansetit mallissa. Veden lätäkkö muutettu pehmeäreunaiseksi. Viimeisimmät kuvat qa/<hahmo>/, eivät vanhat qa/<hahmo>-carry/-kansiot. Fill-kuvat vaativat myös väljempää rajausta (toinen ämpäri leikkautuu reunassa). Lopullinen kuvavertailu ja SHA-paketointi tekemättä.
- Viimeistele lähteen vaatimat4 kulmaa, jahtaaja-asun rinnakkaisvertailu,4–6 ruudun startle, jäänteet ylhäältä/viistosta sekä fill/sweep-tarkistus. Osa koosteista on vanhoja; käytä lopullisista malleista uusittuja.
- Lopputoimitus VAIN claude/postilaatikko: posti/arkiset-hahmot-20261102/ sekä posti/pelikoodari-codex-arkiset-hahmot-toimitus-20261102.md, SHA256SUMS, kolmiot, irrotushetket ja rehelliset kutsumäärät. Vastaanotto, R2, runtime ja julkaisu erillisiä.

## Vastuun siirron tila
Tämä on työn siirto ja aineistoluettelo, ei hahmojen valmistumis- tai vastaanottokuitti. Kuvasession3D-prosessit ovat päättyneet eikä se aloita uusia. Tripo-sessiolle ei ole tämän ajon työkaluissa suoraa viestitys-/herätyskeinoa; siirto kirjataan sen TRIPO-JATKO-20261027.json-jonoon ja yhteiseen postilaatikkoon. Kohdesession lukukuittausta ei vielä ole. Säilytä vanhat hyväksytyt toimitukset ja estä rinnakkainen tuotanto.
