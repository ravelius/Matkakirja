# Kuvainventaario: luokitusohje (Sisältökirjuri 9.10.2026)

Tehtävä: luokittele jokainen kuva (rivi syötetiedostossa) sen PÄÄAIHEEN mukaan. Syöte: JSON-lista, jokaisella rivillä `id`, `avain` (Commons-tiedostonimi tai kuvan url), `selite` (suomenkielinen kuvateksti), `tyyppi` (valokuva / havainnekuva / tyhjä), `lisenssi`, `tekija`, `maa` (pelin maa-asetus, GRC tai FRA tai muu), `kayttopaikat` (missä pelissä kuva on).
Päätä kuvan pääaihe nimestä, selitteestä ja `kayttopaikat`-kentästä. Älä hae verkosta; päättele annetuista tiedoista ja yleistiedostasi. Jos et ole varma, merkitse `epavarma: true` ja kerro syy.

## KREIKKA (rivit GRC…)
Luokka (kenttä `luokka`):
- **A** = pääaiheena **Kreikan valtion muistomerkki**: arkeologinen kohde, antiikin tai bysanttilainen rakennus tai raunio, jota Kreikan kulttuuriministeriö hallinnoi (esim. Akropolis, Parthenon, Erekhtheion, Propylaia, Athena Niken temppeli, Herodes Atticuksen odeon, Dionysoksen teatteri, Olympieion, Hefaistoksen temppeli ja antiikin agora, Tuulten torni, Kerameikos, Delfoi, Olympia, Knossos, Faistos, Mykene, Tiryns, Epidauros, Vergina/Aigai, Delos, Sounion, Bassai, Korintti, Mystras, Dafni, Osios Loukas, Meteora-luostarit?, Rodoksen vanhakaupunki ja Lindos, Santorinin Akrotiri, Pellan Pella, Dion, Filippoi, Thessalonikin Valkoinen torni ja roomalaiset/bysanttilaiset monumentit, Nafplion Palamidi ja Bourtzi, Kreetan Venetsialaiset linnoitukset jne.). Myös valtion ylläpitämä muinaisuudesta periytyvä kohde. EI kuulu: nykyaikainen rakennus (parlamentti, kaupungintalo), kirkko joka on käytössä (Ortodoksinen kirkko; merkitse B-C-rajatapauksena `epavarma`), yksityinen rakennus, stadion jos kokoelma on yksityinen (Panathinaikon on valtion omaisuutta mutta nykyaikainen; merkitse C epavarma), luonto- ja maisemakuva (merkitse C).
- **B** = pääaiheena **valtion museon esine**: museossa esillä oleva esine tai museon sisäkuva (Akropoliin museo, Kansallinen arkeologinen museo, Iraklionin arkeologinen museo, Delfoin ja Olympian museot, Thessalonikin museot, Byzantine Museum jne.): patsaat (karyatidit museossa, Kouros, Poseidon Artemision, Delfoin Ajomies), vaasit, kultaesineet (Agamemnonin naamio, Vafeion pikari), Antikytheran mekanismi, Faistoksen kiekko, freskot museossa jne. EI kuulu: museorakennuksen ulkokuva (luokka A jos museorakennus on arkeologinen, muuten C), esine, joka on ulkomaisessa museossa (British Museum, Louvre: luokka C ja merkitse kohteeseen "ulkomaisessa museossa"), yksityiskokoelma.
- **C** = muu: kaupunkinäkymä, luonto, ruoka, ihmiset, nykyaika, kartta, kirjakuva, ulkomaisen museon esine, kuva jossa Kreikan muistomerkki on vain pieni osa taustaa.
Kentät: `luokka` (A/B/C), `kohde` (lyhyt nimi suomeksi tai Commons-nimi), `perustelu` (≤ 15 sanaa), `ehdotus` (ks. alla), `epavarma` (true/false).

## RANSKA (rivit FRA…)
Luokka:
- **D** = pääaiheena **Ranskan kansallisen domaanin** (domaine national) rakennus tai puutarha (21 domaania): Élysée (palatsi), Chambord (linna ja puisto), Louvre-Tuileries (Louvren palatsi sisäpihoineen, **Louvren pyramidi**, Tuileries'n puutarha, Carrousel'n riemukaari), Angers (linna), Pau (linna), Palais du Rhin (Strasbourg), Palais-Royal (Pariisi), Palais de la Cité (Pariisin Cité: Conciergerie, Sainte-Chapelle, oikeuspalatsi), Vincennes (linna), Coucy (linna), Pierrefonds (linna), Meudon, Saint-Cloud (puisto), Malmaison (linna), Compiègne (palatsi ja puisto), Villers-Cotterêts (linna), Fontainebleau (palatsi ja puisto), Rambouillet (linna ja puisto), Saint-Germain-en-Laye (linna), Versailles (palatsi, Peilisali, puutarhat, Trianonit), Marly. EI kuulu: Notre-Dame (ei domaani), Eiffel-torni (SETE, ei domaani), Arc de Triomphe (CMN, ei domaani), muu linna tai nähtävyys, jos se ei ole listassa.
- **E** = pääaiheena **Louvren, Orsayn tai muun ranskalaisen valtion museon esine** (maalaus, patsas, esine, museon sisäkuva): Mona Lisa, Venus de Milo, Nike Samothrakelainen, Louvren kokoelmat.
- **C** = muu.
Kentät: `luokka` (D/E/C), `kohde` (domaanin tai esineen nimi), `domaani` (jos D: domaanin nimi, muuten null), `perustelu` (≤ 15 sanaa), `ehdotus`, `epavarma`.

## EHDOTUS (kenttä `ehdotus`)
- Jos `tyyppi` on **havainnekuva** (peli oma Codex-kuva): `jätä (oma havainnekuva)`.
- Jos luokka A/B/D/E ja kuva on **valokuva** (Commons tai muu): `havainnekuva` (tilataan Codexilta tilalle; PT:n varovainen kuvalinja). Poikkeus: jos kuva on piirros, vanha PD-kuva tai karttakuva, ehdota `jätä (PD-piirros)`; jos kuva on tarkoitettu osaksi pelin omaa 3D-mallia, ehdota `oma 3D`.
- Jos luokka C: `jätä`.
- Jos kuva on selvästi turha, virheellinen tai riski-arvaus: `pois`.
Lisäksi kenttä `kayttopaikka_yhteenveto`: lyhyt (esim. "oppaan kuvalista Ateena; kaupunkilehti Ateena etusivu").

## TULOS
Kirjoita tulos JSON-tiedostoon (annettu polku): lista, jossa jokaisesta syöterivistä yksi alkio samalla `id`:llä ja yllä olevilla kentillä. Ei muuta tekstiä tiedostoon. Palauta lopuksi yksi rivi: monta riviä luokiteltiin ja montako A/B/D/E.
