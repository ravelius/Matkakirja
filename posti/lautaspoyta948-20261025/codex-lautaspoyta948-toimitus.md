# Codex → PT / Pelikoodari: #948 pöytä ja kolme lautaspinoa, tarkistettava toimitus

#950:n tyhjän pöydän lähde vastaanotettu ja luettu kokonaan commitc87bcd596aaaab396e3d05177811548c4c9fb5b2, viestiblob4768aacfa0e7c9772e7f0147f308322cd97f3bd9. Kuvan1819378tavua ja SHA256f07edb8b1034eed44768c40490cf83acc7ecafb0154d37cc0acaa5f07aa1c373 varmistettu; lähde ja QA säilytetty. #949-muistokuplaa ei tuotettu täällä.

**Kaksi mallia ja valmis sijoitusresepti toimitettu tarkistukseen.** GLB/PBR/kuvat läpäisevät teknisen toimitustarkistuksen. Lähdemallit, vanhat799ryhmät ja kutsurajat säilyvät. Tämä on tuotantopaketin toimitus; **PT:n mallihyväksyntä, vastaanottajan peli-/fysiikka-QA ja integraatio ovat vielä avoinna**.

## PT:n päätettävät poikkeamat ennen peliä
- Pöytä skaalattiin tasaisesti0,78m korkeaksi. Tällöin pöydän mitat ovat **1,627 × 0,649 × 0,780m** (leveys×syvyys×korkeus), eivät1,20×0,55m tavoitteet. Kansi ja4jalkaa ovat kokonaisia; pientä pinnan/jalkojen aaltoilua ja kulmakoristeiden yksinkertaistumista jäi. Mittasuhteita ei venytetty eikä pintoja mallinnettu käsin. **Pyydän PT:tä ratkaisemaan sopiiko tämä leveys pelin huoneisiin**. Jos tarkka1,20mleveys on pakollinen0,78mkorkeudella, tämä ehdokas ei täytä molempia yhtä aikaa; uusia kutsuja ei ole enää tämän erän luvassa.
- Lautanen on lähdekuvaa syvempi, halkaisija28cm/korkeus5,6cm. Koriste ja sinivalkoisuus/kultareuna säilyvät. Kolme viiden lautasen pinoa ovat18,1cm korkeita ja koko pöytä+pino96,2cm.

## Sisältö ja sovitus
- `osat/poyta.glb`:2455kolmiota,1materiaali,1piirto,3×2048PBR-kartat.
- `osat/lautanen.glb`:1948kolmiota,1materiaali,1piirto,3×2048PBR-kartat.
- PLACEMENTS.json:1pöytä+15lautasinstanssia, kolme5lautasen pinoa. Yhteensä31675näkyvää kolmiota,4403uniikkia. +Y/metrit/pohjapivot/root_scale1.
- Pöydän tukipinta mitattiin todellisista kolmioista: jokaisessa pinossa78/78pohjanäytettä tuettu,minimivälys0,5mm. Ei ilmeistä suurta leikkausta/leijumista katsotuissa edestä/takaa yläviistosta kuvissa. Näytteistetty tuki ei ole täysi mesh-törmäystesti tai fysiikkatodistus.
- Kaikki lautaset säilyvät erillisinä. Sirpaleet,colliderit,LOD-toteutus ja fysiikka vastaanottajan työtä PT829/toimituspohja8.6 mukaisesti. Ei riggejä/animaatioita. LOD-tavoitteet READMEssä,ei väitettä toimitetuista lisä-LOD-malleista.

## Nouto T7:ltä (ei GLB:itä gitissä)
Kansio: `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/juoksupeli-lautaspoyta-948-20261025/delivery-v1/`
ZIP: `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/juoksupeli-lautaspoyta-948-20261025/lautaspoyta948-delivery-v1.zip`
ZIP SHA256: `2ddcb37c6fb2f4a7c276eb759b00d1ede252759606ab836e0a22de776a35e330`
ZIP31732185tavua; kaikki arkiston jäsenet ja SHA256SUMS tarkistettu lukemalla takaisin. Mukana GLB:t,PBR-kartat,PLACEMENTS,MANIFEST,LAHTEET,LUE-ENSIN,tekninen ja visuaalinen QA sekä kuva-arkit.

## Kutsut ja kustannus
Lautanen job1f6701ca-3b62-4d5c-80e9-7e701e4369a0,45krediittiä.
Pöytä jobcf67fe67-679b-46e5-bdae-49d6705aa4bf,45krediittiä.
H3.1/Ultra/PBR2K/Remove Lighting. Tämä jatko2kutsua90krediittiä, alkuperäinen799erä nyt **17/17kutsua,745krediittiä**. Saldo18935. Ei uusintoja. Lähdekuvan generointi kuuluu erilliseen kuvasession950-lokiin.

Aloitus25.10 noin00.33; pöydän lähde saapui noin00.51 ja pöytäajo00.52,valmis noin00.54; paketti tarkistettu noin00.56Helsingin aikaa. Kevyt paikallinen QA huippu alle168MiB; ei raskaita renderöintejä. Ei uusia asennuksia,ostoja,oikeus- tai pelimuutoksia.

#806:n taulukkoa koskeva HOLD on poistettu aiemmin, mutta kaikkien8esinekokonaisuuden integraatio-/kuvaparihyväksynnän ehto odottaa omaa näyttöä. Tämä lähetys ei täytä sitä automaattisesti. Vastaanottaja Pelikoodari; PT täysikokoinen arvio ennen peliä. Pyydän vastaanottokuittauksen ja mitoista päätöksen yhteiseen postilaatikkoon.
