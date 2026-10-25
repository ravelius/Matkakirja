# Codex → PT/PK: palatsipuiden #962–964 tekninen menetelmä

Tilauksen aloitus ja kolme pohjakuvaa on pyydetty commitissa `8e21dbd18bc964cfae03f1ec5731bd84905b73e2`. Ei uutta generointia eikä krediittejä; saldo 18 800. Lähdekuvien valmistelu voi jatkua tästä teknisestä kysymyksestä riippumatta.

Tarkistin vanhat toimitetut GLB:t muuttamatta niitä. Kaikissa kolmessa on yksi OPAQUE-materiaali ja RGB-värikartta ilman alfakanavaa. Maanpinnan alimman 15 cm:n kärkien X/Z-leveys on pagodipuussa noin 2,78/3,28 m, jalavassa 2,49/2,07 m ja neidonhiuspuussa 3,84/3,64 m. Tämä vahvistaa uuden tilauksen syyn: juurityvet ovat leveitä. Mittaus on verkkodiagnostiikka, ei rungon kasvitieteellinen läpimitta.

Nykyisen Tripo Studion Geometry & Texture-, Texture- ja GLB Export -näkymissä ei näkynyt alfakartta-, lehtikortti- tai opacity-valintaa. Virallinen Texture & PBR -tuoteohje luettelee väri-, normaali-, karheus- ja metallisuuskartat; Export & DCC -ohje ei vahvista alfa-lehvästön generointia. Blogissa puhutaan alfasta ja manuaalisesta korjauksesta, mutta se ei todenna käytettävissä olevaa Studio-toimintoa.

- https://www.tripo3d.ai/product-doc/module-post-processing/texture-pbr
- https://www.tripo3d.ai/product-doc/export-and-integration/export-dcc

## Tarvittava tekninen linjaus PT:ltä/PK:lta

Suosittelen säilyttämään laadun kannalta oikean alfalehvästön vaatimuksen. Jos PK/Lavastajalla on jo luvallinen lehtikortti/alfatekstuurimenetelmä, voidaanko uusien Tripo-puiden rungot ja pääoksat käyttää sen pohjana ja tehdä lehvästö vastaanottajan vaiheessa? Tämä olisi poikkeus tulkintaan, jossa koko valmis lehvästö pitäisi tulla Triposta; en tee paikallista uutta geometriaa ilman linjausta. Vai haluaako PT ensin yhden rajatun Tripo-puuehdokkaan ulkoasuarvioon niin, että alfavaatimus jää näkyvästi avoimeksi? Se kuluttaisi yhden erän kolmesta kutsusta, ei avaisi lisäkierroksia.

En merkitse alfaehdon täyttymistä pelkän MASK-asetuksen perusteella enkä toimita kolmea umpinaista mallia vaatimusten mukaisina. Lähdekuvapyyntö ja mittatarkistuksen valmistelu ovat käynnissä. Tarkistusohjelma tallennettu T7:lle: `output/juoksupeli-puut-v2-962964-20261025/qa/check_tree_material.py`; vanhojen puiden tulokset `qa/prior-tree-alpha-check.json`.

Kaikki vanhat mallit säilyvät. Ei pelimuutoksia, asennuksia tai ostoja.
