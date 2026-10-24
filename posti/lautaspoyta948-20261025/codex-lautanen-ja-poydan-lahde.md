# Codex → PT / Pelikoodari: #948 lautanen valmis tarkistukseen, pöydän lähde odottaa

Omistajan uusin suora ohje tässä chatissa: ”käynnistä kaikki työt”. Tarkistin työjonon, postireitityksen ja käynnissä olevat työt. #948:n lautasen ainoa kutsu on nyt tehty ja viety T7:lle. Valmiita/jo toimitettuja eriä ei generoitu uudelleen. #949 pysyy kuvasession työnä.

## Lautanen
- Tripo H3.1 Best Quality / Ultra / Triangle2000 / PBR / Remove Lighting / 2K.
- Job **1f6701ca-3b62-4d5c-80e9-7e701e4369a0**. 45 krediittiä, saldo19025→18980.
- #799 kokonaisuus nyt **16/17 kutsua,700 krediittiä**. Viimeinen kutsu on varattu tyhjälle tummalle Qing-pöydälle. Ei uusintoja.
- GLB1948 kolmiota,1 materiaali,1 piirto,3×2048px tekstuurit.28cm halkaisija,5,6cm korkeus. Standardin `codex-3d-tarkistus.mjs` tekninen tarkistus läpäisty.
- Tripo teki profiilista lähdekuvaa syvemmän. Koriste/sininen lohikäärme/kultareuna ovat tallella. Tämä poikkeama on avoimesti PT:n tarkistettavana; mallia ei kutsuta peliin hyväksytyksi.
- Kolme pinoa voidaan koota **5 lautasesta/pino**, korkeus18,1cm.15 instanssia29 220 näkyvää kolmiota mutta vain yksi uudelleenkäytettävä mesh ja tekstuurisarja. Mittaus käyttää todellisia mallipintoja; fysiikkaa ja täyttä törmäystestiä ei ole tehty. Pöydän lopullinen tukikorkeus vielä puuttuu.

T7-tarkistuspaketti: `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/juoksupeli-lautaspoyta-948-20261025/plate-review-v1/`.
GLB SHA256: `81a556aca695c51d08ec59440f58a0ee7da42cea86c84c776afe0d3630f82a89`.
Mukana GLB,PBR-kartat,SHA256SUMS,LAHTEET,tekninen QA sekä alustava STACKS-DRAFT.json. Tämä on lautasen tarkistuspaketti, ei koko pöytätoteutuksen valmis toimitus.

## Seuraava työn riippuvuus
25.10 klo00.33 lähetetty lähdekuvapyyntö on jo postissa: `posti/codex-paatoimittaja-lautaspoyta948-aloitus-20261025.md`, commit0becb9d89096a65e5bb1730bfa10734ee2a2e689. Tarvitaan #949:n pöytää vastaava **erillinen tyhjän pöydän Tripo-kuva**. Pöydän kuvalähdettä ei vielä ole tässä työssä. Pyydän PT:tä varmistamaan kuvatuottajan toimituksen tai toimittamaan olemassa olevan hyväksytyn tyhjän pöydän kuvan/polun. Ei uutta omistajan päätöstä eikä uudelleen tilattavaa muistokuplaa tarvita. Pöydän malli tehdään sillä viimeisellä varatulla kutsulla, sitten lopullinen osapankki+sijoitusresepti.

#806:n taulukkoon liittyvä HOLD on poistettu, mutta kaikkien8ryhmän peli-integraation ja kuvaparien hyväksynnän ehto on edelleen avoin. Vanhojen puiden/harjakoristeiden/Amsterdam-kävijöiden ym. vastaanottovaiheita ei tulkittu uudeksi tuotantoluvaksi.

## Resurssit ja rajat
T7/NAS-tuotanto; selaimen pakottama Downloads-välitiedosto kopioitu, SHA-varmennettu ja poistettu vasta varmennuksen jälkeen. Tämän uuden paikallisen tarkistuksen huippu noin168MiB, pinoesikatselu137MiB. ChatGPT-prosessien fyysinen muisti noin14,1GiB (25.10 noin00.36); noin71% OS-reportoitu vapaa osuus. Ei raskasta paikallista renderöintiä; ei asentamista,ostoja,pelimuutoksia tai uusia oikeuksia. PT:n malli-/peli-hyväksyntä sekä vastaanottajan fysiikka,LOD ja materiaalit ovat erillisiä.
