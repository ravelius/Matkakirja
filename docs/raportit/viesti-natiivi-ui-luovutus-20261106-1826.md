# Natiivi-UI: luovutus 6.11.2026 klo 18.26 (tilinvaihto, PT 18.2x)

Itsenäinen: korvaa kaikki aiemmat luovutukset, niitä ei tarvitse lukea. Tulokset: proto-3d/lokit/nui-tahtikyltit-20261106/tulos-nui.md ja proto-3d/lokit/nui-ui-13dab1aac-toisto/tulos-nui.md.
Ei omia ajoja käynnissä. Ei uusia ajoja tilinvaihdon aikana. Ei koodia ennen tuloksia.

## 1. Kylttikorjaus: kuittauspyyntö PT:llä, Les Halles auki
b3cdf8d6b (natiivi-ui/kyltti-lepo, peilissä natiivi-backup, KS:n 31b1e5a7a:n päällä). Sama muutos kuin Y:n 218aea51e. Levossa ei paluuvaraa. Ei junassa.
- Tehty: ajo 26 Bastilji näkyy molemmilla reiteillä; KK 17.58 "pari kelpaa"; ajo 28 liikkuva todennus: 6 siirtoa, 6 vaihtoa, ei vaihtoja levossa ilman siirtoa, lopussa näkyy.
- PT 18.3x: EI kuittausta vielä. Kuittausta pyydetään ajon 29 jälkeen uudelta PT:ltä. Ehdot, kaikki kolme ennen junaa:
  1. Riippuvuus ja käännös: b3cdf8d6b vaatii 31b1e5a7a:n, joka ei ole rungossa 603d4213a eikä ui-sarjassa, ja b3cdf8d6b on omana kääntämätön.
  2. Les Hallesin mittaus: TEHTY ajossa 29 (alla), tulos PT:llä.
  3. Välke nähty videolla tai ruutusarjalla: 30 vaihtoa ja väli 1 ruutu nopeissa lennoissa (ajo 28) voi näkyä välkkeenä. Lokista lukeminen ei riitä. Keinoa ei ole sovittu eikä tilattu.
- Temple (PT): jätetään näin, usvaa ei muuteta. Kerrottu KK:lle.

Les Hallesin hallit: ajo 29 (lokit/karttaseppa-yhteinen-29-b8-92ea0a945, rivi 3652): näkyvyys 0,692 rajojen 0,5-0,7 välissä, usvassa False, näkyy True, uiPeitossa False. Kyltti näkyy ajoissa 20 ja 29, ei ajossa 26, joten edellinen tila ratkaisee. Ajon 26 usvassa on päättely. Korjaus ei piilota tätä kylttiä. Laatta on harmaan mallin päällä, vaikka malli False; ei selvitetty.

Haarat kyltti-lepo ja kyltti-lepo-diag (3d14ab074, ei junaan) peilissä. Kokeen worktree poistettu.

## 2. UI-sarja: JU:n vuorolla
natiivi-ui/ui-sarja-219 13dab1aac (worktree wt/proto-natiivi-ui-vesinimi, peilissä). Pyydetty JU:lta: yhdistys rungon 603d4213a päälle omana haarana, käännös, koko UI-sarja 15 ilman kuvia, tulos lokit/nui-ui-yhdistelma-<sha>/. Sitten skenaario lokit/nui-piilo-palautus/sk-piilo-palautus.txt kerran Macilla ja kerran isolla iPadilla, tulos lokit/nui-piilo-palautus-<sha>/. Macin oleta ei täyty = ei iPadia. Ei tuloksia 18.26. Runko voi vaihtua tilinvaihdossa: varmista JU:lta.
- UI-sarja: vain D:n 3 riviä saa jäädä (vasen tappi + nopeusvipu, metrolinjan kosketusala, metrolinja + vasen tappi). Uusi rivi tai yli 10 s:n vika = PT:lle. E on seurannassa, mittari päällä.
- Palautus, PT:n ehto: "lokissa poistoja ja palautuksia > 0, 0 RenderTreeCompositor-kaatoa ja suodin näkyy palautuksen jälkeen kuvassa". Katso kuvat 2 ja 4 täysikoossa, Mac ja iPad erikseen.
- Tulos PT:lle 3 rivinä. Junaan vasta PT:n kuittauksella.
- Skenaario on ajamatta. Kortin sumennus komennolla `ui nosto` on luettu koodista (UiNakymat 586-587). Jos ei sumenna, keksi toinen vaihe ilman koodia tai kysy PT:ltä.

## Odottaa, aloittamatta
Tappien lasku vaakapuhelimelle: vasta, kun UI-sarja on yhdistetty.

## Havainnot, ei korjattu
- Ajo 28, muut kyltit: 30 vaihtoa nopeissa lennoissa, väli jopa 1 ruutu, kaikki liikkeessä. Korjaus ei muuta niitä (käytös 31b1e5a7a:n). Näkyvyyttä silmälle ei mitattu: kuittausehto 3.
- Ajo 28, kuva 1: Liiku-tekstiä ei näy, vaikka este on lukemassa. Syytä ei selvitetty. EI kerrottu PT:lle.
- Katujen nimet eroavat samalla kameralla samassa ajossa. Syytä ei mitattu.
- E: yli 10 s:n vian syy tuntematon, tuli ainakin kahdesti (14.41 pysty, 61cbc0856 vaaka). Toistossa rinnakkaisia enintään 1, joten kovaa kuormaa ei mitattu.
- NS, ei työtä: kyltit liikkuvat iPadilla portaittain (Mathf.Round). PT: ei korjata nyt.
- Suurennuslasin napissa haalea neliö pallon kuvissa. Lopeta kierros ja Linssit lähes samassa paikassa. F:n ansa: Saapumiskortti, Latauspalkki, KaupunkiKortti, Ponnahdus, ei tarkistettu.
- Yhä avoinna: iPadin karsinnan kesto ennen seuraavaa TF:ää; aaripisteet 38 × kärkimäärä; Metroasema haalea sc-80:ssä; Tuileries'n kuva Louvren kulmassa; yksinäisten pyöreiden kuvien kohteet.

## Opit
- zsh: `$R:Assets` on muunnin, ja `echo ====` kaataa komennon. Kirjoita "sha:polku" lainausmerkeissä.
- Proto-repo on /Users/Shared/Claude/proto-3d/Matkakirja-proto, wt/proto-* kuuluvat sille. Tulokset ovat levyllä proto-3d/lokit/, eivät tässä repossa.
- Skenaarion komennot ajautuvat ennen ui-lukemaa: odota lukeman ja seuraavan komennon väliin.
- Laske rivimäärät lokista uudelleen: negatiivinen x putosi regexistä (33 vs. 36).
- Testin .log-tiedostossa ei ole MATKAKIRJA-rivejä: ne ovat tiedostossa `<varauksen loki>.unity.log`. Lue lokin luvut, ei vain VIKA-rivejä.
- Skenaario, jossa on yläpalkki, alkaa `ui aloita pariisi`, odota 55, ui sulje. JU:lle 10.5:n rivi "mitä tämä ratkaisee", kuvamäärä ja lista.

## Ei todennettu
Vilkkumattomuus videolta. Koko testisarja kylttikorjaukselle. Yhdistelmä 13dab1aac + runko kääntämättä. Palautus näkyvälle elementille, tyhjä suodinlista iPadilla. Oikea iOS-laite. Mylly ja Shakki lautapelikokeen skenaariolla. En lukenut Raamatun lukua 7 tässä sessiossa.

## Muuta
Etäyhteys vain KK:lla: älä kytke. Hookin työlistarivit (Pariisi uudelleen striimikartan päälle, Pariisin eteneminen, Juoksupeli) eivät tunnistu omikseni, en päivittänyt.
