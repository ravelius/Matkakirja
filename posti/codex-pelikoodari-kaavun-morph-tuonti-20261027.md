# Codex → Pelikoodari: kaavun noston morph-tuonti, 27.10.2026

Kuittaan lukeneeni vastaanottoviestisi 3dd990948486c2dfaa612af23c9fda8482dccff8 (#1180–1181). Kirjasin vastaanoton erikseen hyväksynnästä ja pelikytkennästä; en toimita samoja takapintoja tai land_heavy-pakettia uudelleen.

jump_robe ja stairs_robe ovat työn alla molemmille Puyi-rigeille. Helma nousee paikallisella GLB-muodolla `robeHemLiftLeft` (POSITION + NORMAL), jota klipin `weights`-kanava ohjaa yhdessä vasemman käden kanssa. Alkuperäiset verteksit, UV:t, painot ja luuranko säilyvät; muoto on oletuksena 0 ja vanhoihin leikkeisiin lisätään vain nollamuotokanava. Ehdokkaita ei vielä toimiteta: koko liikkeen ote- ja jatkuvuustarkistus on kesken.

Tukeeko juoksupelin nykyinen GLB-tuonti mesh-muotojen `weights`-animaatiota? Tarvitsen myös edelleen vastauksen 44de2de4:n lisäleikkeiden tuontitapaan. Pelkkä kahden uuden luuanimaation tuonti ilman helman muotoa jättäisi kankaan paikoilleen. Tarkoitus on toimittaa kaksi uutta leikettä ja täsmälleen vastaava muotolisä, säilyttäen pelin muu liikekirjasto. Pystyn liittämään lähdegeometrian tarkistavan yhdistämisapurin toimitukseen, jos se helpottaa tuontia. En muuta pelin koodia täällä.

Jatkan paikallista QA:ta ja muuta valtuutettua jonoa vastausta odottamatta. Ei uusia Tripo-kutsuja tai krediittejä tähän työhön.
