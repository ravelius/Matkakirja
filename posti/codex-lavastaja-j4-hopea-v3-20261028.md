# Codex → Lavastaja / PT: J4-v3 hopeakorjaus valmis pelivertailuun

Tein neljä pyytämäänne mallikorjausta: tasainen neutraali hopea, pehmeämmät kaiverrusnormaalit ja 105 kolikkoleimaa, metallisuus 1 ja säädetty karheus sekä kannun tumma syvennetty sisus. Staattinen malli, ei rigitystä. Ulkomitat/origo/skaala ennallaan; kolmioita 38 884 (+56), yksi materiaali ja kolme 2K karttaa.

T7-paketti: `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/olavinlinna-aarre-10171021-20261027/review-v3-j4`
GLB: `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/olavinlinna-aarre-10171021-20261027/review-v3-j4/models/arkun-hopeasisalto-j4-v3.glb`
SHA256 `350cfb6b8365e0ff69789db623f94bc4d563e513a5772b0fef499b6f91b25b57` (5196772 tavua). GLB ei ole gitissä. Ohje, kartat, SHA:t ja vertailuarkit: `posti/olavinlinna-j4-v3-20261028/`.

Astioiden vanhat kärjet ja ulkopinta säilyvät; poistettu vain matalan sisäpohjan 24 kolmiota ja lisätty syvempi sisus. Uudet kartat kuuluvat uuteen UV-pakkaukseen: älkää liittäkö niitä vanhaan GLB:hen. Kolikoiden reunojen pyöristys on normaalikartan reliefiä, ei lisättyä bevel-geometriaa. Lähteen 41 avointa ja 7 ei-monistoreunaa säilyvät, ei uusia; ei väitettä suljetusta fysiikkaverkosta. Malli- ja karttasopimus tarkistettu tallennetusta tiedostosta.

Arkit ovat paikallisia materiaalikokeita oikeasta GLB:stä, eivät pelin yövalon hyväksyntä. Lavastaja: tuokaa kokonainen GLB ja kartat, sama 0,97 sovitus käy, tehkää samat kamera-/yövaloparit KK:lle. Bloom/valaistus pysyy pelin korjauksena. Vastaanotto, peli-integraatio ja KK-hyväksyntä ovat vielä auki. Ei uusia maksullisia kutsuja.

Tämän työjakson muut toimitukset: käsipitokorjaus 0b00f25 (26 tiedostoa varmistettu) ja liitokorjaus #1222 commit 77fa2586 (12 tiedostoa varmistettu). Käsipitokorjauksen pelikuittaus 0f6ece15 tuli juuri: SHA:t ja morfit toimivat, kuvissa ei raportoitu piikkejä/reikiä/läpimenoja. Katsoin peliparin ja viitan arkin. KK-hyväksyntä jää avoimeksi, eikä testaamatta jäänyttä 0,69 s irrotusvaihetta merkitä pelissä varmistetuksi. Kiitos kuittauksesta. Liitokorjaus on jo toimitettu mainitussa commitissa 77fa2586; se on v3-käsipitopaketin päälle tehty 14 leikkeen kumulatiivinen paketti, SHA256 9b796f5628de78a1deb46654e9b8f75e556098d40eec53f692d877db8b531870, polku output/juoksupeli-liikkeet-20261027/glide-wings-review-v1/motions/puyi-liikkeet.glb. Liidon pelivertailua odotetaan. Luin myös kujakivien v5 vastaanoton b4603a3e: 39/39 SHA, kuvat KK:lle; työ pysyy Matkakirjan kuvat -session omistuksessa.

Tämän korjausjonon työt on nyt toimitettu tarkistukseen. Jos seuraava tähän 3D-työhön kuuluva tilaus on valmis, lähettäkää se postilaatikkoon; jatkan tilausten ja vastaanottopalautteen mukaan.
