# CODEX → PT/Fable: Petřín K1 v3, ensimmäisen menetelmän tarkistus

K1 v3 ja sen uusi maski toimitetaan arvioitaviksi. **HYLÄTTY sitovaksi mallinnustavoitteeksi:** uuden rakennekaavion rajaus ei säilynyt. Torni on edelleen noin 63 % kuvakorkeudesta, tavoite noin 40 %. Hyväksyttyjä tavoitekuvia ja IoU-maskeja on edelleen 0. K2–K5 odottavat K1:n hyväksyntää, eikä mallinnustuotantoa ole aloitettu.

- [K1 v3, natiivi PNG](petrin-K1-v3.png)
- [K1 v3, alustava siluettimaski](petrin-K1-v3-maski.png)
- [Lähteet, generointiprompti, menetelmäpäätös ja QA](petrin-K1-v3-tarkistus-20261014.json)

## Mitä tehtiin

Lähde `fable-codex-petrin-K1-v2-palaute-20261014.md` luettiin kokonaan (commit a7de16e378793738e2c2d8677b0e386c41f0d98b, blob 26174a0d0b9ce4eddb0118d9b89943131f288690). V2 on kirjattu PT:n vastaanottamaksi ja hylkäämäksi tavoitekuvaksi. PT:n hyväksymä 1536 × 1024 natiivikoko ilman suurentamista säilyy; tämä ei tarkoita tavoitehyväksyntää.

Käytin ohjeen ensimmäistä menetelmää: muokattavaksi kuvaksi annettiin **uusi koodilla piirretty rakennekaavio**. Sen torni oli halutussa paikassa ja koossa; tasanteiden sijoitus johdettiin annetun K1-kameran projektiosta. Koko valokuvamainen sisältö pyydettiin luomaan uutena kaavion koko kankaalle. V2 oli ainoastaan tyyliviite, CC0-kuva arkkitehtuuri- ja materiaaliviite. Vanhan valokuvan pikseleitä ei pienennetty, liitetty, paikallisesti muokattu tai laajennettu.

Tässä korjauksessa tehtiin 1 kuvagenerointikutsu; Petřínin K1:n kokonaismäärä on 3. K2–K5: 0 kutsua. Palautunut kuva on 1536 × 1024. PNG-viennin RGB-pikselit vastaavat natiivia täsmälleen; vain kuvaileva metadata/sRGB-tallennus lisättiin. Ei suurennusta tai muuta pikselikorjausta. Metadata kertoo: Havainnekuva. Tekoälyllä tuotettu, ei valokuva.

## QA

| Kohta | V3 havainto | Kamerasta johdettu tavoite | Tulos |
|---|---:|---:|---|
| Torni mastokärjestä jalkoihin, osuus kuvakorkeudesta | 63,2 % | 40,0 % | Hylätty |
| Mastokärki, ylhäältä laskettuna | 15,2 % | 30,1 % | Hylätty |
| Jalkojen taso, ylhäältä laskettuna | 78,4 % | 70,0 % | Hylätty |
| Alatasanne, osuus näkyvästä torniakselista jaloista ylöspäin | 36,8 % | 26,4 % | Hylätty |
| Ylätasanne, osuus näkyvästä torniakselista jaloista ylöspäin | 77,7 % | 70,0 % | Hylätty |
| Fotorealistinen ilme / koko torni näkyvissä | Kyllä | Kyllä | Ilme hyväksyttävä |
| Natiivi ja toimitus | 1536 × 1024, ei suurennusta | PT:n #259 palautteessa sallittu | Tekninen natiivitoimitus |

Tasanteiden prosentit ovat näkyvän projektion suhteita. Sitovat fyysiset lähtömitat pysyvät: runko 58,7 m, alatasanne 20 m, ylätasanne 51 m. Masto noin 12 m ja kokonaiskorkeus noin 71 m ovat epävarmoja arvioita. Kuva ei varmista kameran todellisia metrejä tai absoluuttisia rakennemittoja.

Maski on tehty uudelleen v3:n natiivikoordinaateista: sama 1536 × 1024 kangas, torni 255, tausta 0, ei pehmeää reunaa. Se on **alustava täytetty ulkosiluetti**, jossa ristikkorungon sisäaukot täytetään; se ei ole näkyvän metallin segmentaatio. Maskin ääriviiva tarkistettiin kuvan päällä ja korjattiin, mutta pikselintarkkaa IoU-vertailutotuutta ei ole sertifioitu. Uuteen suunnittelustensiiliin verrattu IoU on vain rajauseron diagnostiikkaa, ei mallin tarkkuusluku. V3 + maski eivät kelpaa hyväksytyksi mallinnus-/IoU-tavoitteeksi.

## Toinen menetelmä odottaa omistajan poikkeuslupaa

V2:n pienennystä, siirtoa, ympäristön outpaint-laajennusta ja tasanteiden paikallista muokkausta **ei ole tehty**. Niistä on vasta toteuttamaton suunnitelma tarkistusliitteessä. Omistajan aiempi suora ohje on: ”Kayta Matkakirja-kuvien korjauksiin aina kokonaan uutta generointia” sekä ”Ala koskaan muuta vain pienta osaa olemassa olevasta generoidusta kuvasta”. Ohje on tallennettu tiedostoon `/Users/samireivinen/.codex/memories/extensions/ad_hoc/notes/20260902-230640-imagegen-no-partial-edits.md` riveille 3–5. Uuden kaavion koko kankaan muuntaminen kokonaan uudeksi kuvaksi toteutettiin tämän ohjeen puitteissa; v2-valokuvan osittainen muokkaus vaatii erillisen suoran omistajan poikkeusluvan.

Pysähdyn tämän v3-arviointipaketin toimituksen jälkeen. Ei uusia K1-kutsuja ilman tarvittavaa menetelmälupaa/palautetta, ei K2–K5-kuvia ennen K1:n hyväksyntää, ei vanhojen #70/#71 töiden jatkamista. Kaikki v1/v2-kuvat, maskit, lähteet, hylkäyssyyt ja postitoimitukset säilyvät historiassa. Tämä on sisäinen PNG-arviointitoimitus Git-postilaatikkoon; R2:ta, pelijulkaisua, main-haaraa tai mallinnustuotantoa ei käytetä.
