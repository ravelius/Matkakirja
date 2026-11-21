# juna-ja-julkaisu · vastuu JU · tarkistettu 21.11.2026

TAVOITE: Omistaja saa linkistä uusimman toimivan version, testaaja TF:stä kokonaisen, vanhaa asennusta rikkomatta.

SÄÄNNÖT:
1. Auki yksi juna; hyväksytty siihen heti, keskeneräinen odottaa. [R-10.2]
2. Junaan heti (sha + versiorivi; näkyvä KOHTA, tekninen LAJI); vain ristiriita tai kääntymättömyys pysäyttää. Näkyvä työ versioon vasta KK:n nippumerkinnällä; siirtymä: linkki KK:n sanalla, kunnes nippu valmis. [P-261111-6] [R-10.9] [P-261117-55] [P-261118-9]
3. KK:n ehto vain kokeille ja kuvina näytettävälle, kirjanpitoon EHTO lähteineen; numero pois linkistä ennen näyttöä. [P-261112-5]
4. Ennen linkkiä: käännös virheetön (testit: 2), sisältö ja media palvelimella, Uutta-rivi selkeä. [P-261112-5]
5. Linkistä rivi tekijälle ja PT:lle; KK:lle, jos se asetti ehdon tai asia omistajalle. Omistajalle kerran per versio, vain linkin sisältö. Linkin jälkeen KK katsoo Kesken, Jonossa. [P-261112-5] [P-261117-110]
6. Linkki ≤ 4/pv, kun junassa uutta; ylimääräinen KK:n sanalla. TF ≤ 2/pv, ellei omistaja pyydä. [R-10.2] [P-261114-9]
7. TF, lukitus ja Mac-paketti vain omistajan pyynnöstä (KK välittää sanatarkasti); Mac ei synny linkistä. [R-10.2] [P-261111-5] [P-261118-43]
8. Osittaista julkaisua ei ehdoteta; viivästävä osa kärkeen. "Heti" ohittaa ehdot, ilman testejä ajot; ehdollinen käsky ehdon toteuduttua; suoraan peliin = ilman kuvia, linkki omalla käskyllä. Pyydetyt korjaukset NYT-kuvissa: KK kertoo heti; julkaisu KK:n sanalla, katsomaton Kesken-rivinä. [P-261024-1] [P-261117-109] [P-261118-5] [P-261118-33] [P-261118-41] [P-261118-42] [P-261119-29] [P-261119-30] [P-261119-35] [P-261121-11]
9. Versio haetusta päähaarasta, nostaa juna. [R-10.1]
10. Web-repon sisältö-, raportti- ja ohjemuutokset PT yhdistää vihreinä. [R-10.12] [P-261109-1]
11. Palaute-erä junaan, kun pääosa todennettu; PT tarkistaa loput. [R-10.9]
12. TF-vienti: lokirivi päähaaraan, paketti, TF; editori kiinni, yksi kerrallaan. [R-10.14] [R-10.6]
13. Muutosloki junan mukana; TF:n Mitä testata siitä. [R-10.8]
14. TF sisäisillä: rivi PT:lle ja KK:lle; hyväksytty build samana versiona beta-arvioon, ryhmille. [R-10.2] [R-10.8]
15. Osoittimet yhteisiä kaikille versioille: vanhalle osaamaton data uuteen osoittimeen; vastaus vain lisäten. [R-9.8]
16. Sisällön osoitin vaihtuu päähaaraan yhdistäessä; mallipakettien osoittimen JU PT:n kuittauksella. [R-10.14]
17. Juna ajetaan käynnissä olevan ajon jälkeen kuva-ajojen ohi, yli 10 min osiin. Päättömät testit rinnan; erän hyväksytyt yhteen versioon, punainen erikseen. [P-261114-4]

EI VIKA:
- Juna lähti osan ollessa kesken.
- Vanhempaa buildia ei voi asentaa.
- Linkistä puuttuu numero, jonka ehto kesken.

TEKOTAPA:
- Junarivit: tools/asemataulu/juna.py; jono ja versiorivit: julkaisija-tyokalut/linkki-224-uutta/.
- Uutta-tarkistus: jako-paketoi.zsh; vanhan sisällön esto: minSovellus; muutosloki: tools/vienti/muutosloki-natiivi.json; sisällön vienti: vie-sisalto.yml.
