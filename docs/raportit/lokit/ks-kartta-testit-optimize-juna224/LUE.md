# KS 18.11.2026: Kartta-testit -optimize+ (2769492dc)
Ilman -optimize+:ia csc merkitsee kokoonpanon DisableOptimizations → JIT ajaa debug-koodia; kaikki Kartta-testien aikamittaukset ~2,7× liian suuria.
Optimoituna (µs/talo, pienin 3 ajosta): itä 20,2 (oli 54,5), pohjoinen 29,7 (86,3), länsi 28,5 (82,1). T-liitokset 10,4 / 14,2 / 13,6; mansardi ~4.
Tulokset samat: 1352/1352, talot.txt 0 eroa 906047e27:een, VERKKO-tiivisteet samat, Lyon ja P7 100 vain ms/leima.
T-LIITOKSET optimoituna (µs, itä/pohj/länsi): keräys 0,7/0,8/0,8 · lajittelu 4,3/4,3/4,3 · kanon 0,6/0,7/0,7 · Puolisivut 0,9/1,2/1,2 · Jaettavaa 2,1/2,4/2,5 · Jaa+Korvat 3,5/5,5/4,8.
KOKEILTU, PERUTTU: oma lajittelu (avain, kärki) → hitaampi kuin Array.Sort JA 2 taloa eri tavuin (tasatilanteiden järjestys vaikuttaa);
laiska Y-lajittelu → ei hyötyä (Y tarvitaan lähes aina); tasoesisuodatus SivunKarjet → suodattaa vain 5 % (mansardin kärjet päällekkäin tasossa);
Array.Copy eka:sta, oma-kärki silmukan ulkopuolelle → ei mitattavaa. Lajittelu on Array.Sortin omaa aikaa; tavulleen sama nopeutus vaatisi eri tietorakenteen.
