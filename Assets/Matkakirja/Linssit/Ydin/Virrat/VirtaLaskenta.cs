// IHMISEN MATKA VÄRIVIRTOINA — SAAPUMISAJAT (Dijkstra) JA KENTTIEN KOOSTE
// (web js/aikajana-virrat-laskenta.js: keko, nopeus, laskeVirta,
// rasteroiNauha, yhdistaVirrat, ylityksenSaapuminen, laskeKentat).
//
// Omistajan linjaus 6.9.2026 (Raamattu, IHMISEN MATKA ON VARIVIRTOJA, EI
// PISTEITA): leviäminen näytetään maata pitkin laajenevina värialueina
// puolen asteen ruudukossa; meri estää paitsi nimetyissä ylityksissä.
//
// BITTITARKKUUS: kentässä kuljetetaan τ = −vuosia sitten Float32-arvona
// (webin Float32Array), ja keon avain on sama Float32-pyöristetty arvo.
// Kaikki välilaskut tehdään doubleina ja pyöristetään floatiksi samoissa
// kohdissa kuin JS:n Math.fround ja typed array -kirjoitus. Keko on sama
// binäärikeko samoine vertailuineen (lisäyksessä `<=` pysäyttää, poistossa
// vasen lapsi ennen oikeaa aidolla `<`:llä), joten tasapelit ratkeavat
// samassa järjestyksessä ja edeltäjäketjut ovat identtiset.
//
// Ei olioita ruutua kohti: kaikki kentät ovat taulukoita (float[]/int[]/
// short[]/byte[]), ja naapurien askelpituudet lasketaan kerran riviä kohti.
using System;
using System.Collections.Generic;

namespace Matkakirja.Linssit.Virrat
{
    /// <summary>Laskennan ympäristö: maamaski, rannikko ja ruudukon koko.</summary>
    public sealed class Ymparisto
    {
        public byte[] Maa;
        /// <summary>Rannikkomaski; null → koko maa rannikkoa (ei sisämaakerrointa).</summary>
        public byte[] Rannikko;
        public int Leveys = Ruudukko.Leveys;
        public int Korkeus = Ruudukko.Korkeus;
        public int Siemen = 1;
    }

    /// <summary>Yhden virran tulos: saapumisajat ja edeltäjäketju.</summary>
    public sealed class VirranKentta
    {
        public string Tunnus;
        /// <summary>Saapumisaika vuosia sitten, 0 = ei saavuteta.</summary>
        public float[] Aika;
        /// <summary>Nauhojen meriruutujen aika (vuosia sitten), 0 = ei.</summary>
        public float[] Meri;
        /// <summary>Ruutu, josta aika viimeksi parani; −1 = lähde, nauha tai saavuttamaton.</summary>
        public int[] Edeltaja;
        /// <summary>Nauhan piste, jonka kautta ruutu saavutettiin; −1 = ei nauhaa.</summary>
        public short[] NauhaPiste;
        /// <summary>Nauhan numero virran nauhalistassa; −1 = ei nauhaa.</summary>
        public short[] NauhaNro;
        /// <summary>Virran nauhat (vanojen johtaminen hyppää niitä pitkin).</summary>
        public Nauha[] Nauhat = new Nauha[0];
    }

    /// <summary>Virrat yhdeksi kentäksi: ruudun väri on ensin saapuneen virran väri.</summary>
    public sealed class Yhdiste
    {
        public float[] Aika;
        /// <summary>Virran indeksi listassa, −1 = ei kukaan.</summary>
        public sbyte[] Virta;
        public float[] Meri;
        public sbyte[] MeriVirta;
    }

    /// <summary>Siirtymä virrasta toiseen (Beringia): kohderuudun edeltäjä on toisen virran lukupisteessä.</summary>
    public sealed class Siirtyma
    {
        public string Tunnus;
        public int Kohde;
        public string Virta;
        public int Lue;
    }

    /// <summary>Koko kaaren kentät: yhdiste, retki, vanha väestö ja vanojen tarvitsemat edeltäjät.</summary>
    public sealed class Kentat
    {
        public float[] Aika;
        public sbyte[] Virta;
        public float[] Meri;
        public sbyte[] MeriVirta;
        /// <summary>Varhaisten retkien saapumisajat; null, jos aineistossa ei ole retkeä.</summary>
        public float[] Retki;
        /// <summary>Vanhan väestön pehmeä maski 0…1; null, jos ei vanhaa.</summary>
        public float[] Vanha;
        public byte[] Rannikko;
        /// <summary>Virtojen kentät järjestyksessä (sisältää edeltäjät ja nauhat).</summary>
        public List<VirranKentta> Edeltajat = new List<VirranKentta>();
        public List<Siirtyma> Siirtymat = new List<Siirtyma>();
    }

    /// <summary>Vaiheittaisen laskennan tuotos: virran tunnus tai "valmis" (silloin Kentat on koko tulos).</summary>
    public sealed class KenttaVaihe
    {
        public string Vaihe;
        public Kentat Kentat;
    }

    public static class VirtaLaskenta
    {
        /* ------------------------------------------------------------ nopeus */

        /// <summary>
        /// Nopeus km/vuosi hetkellä `vuosiaSitten`: taulun rivi on voimassa
        /// omasta ajastaan seuraavan riviin asti.
        /// </summary>
        public static double NopeusHetkella(Nopeus nopeus, double vuosiaSitten)
        {
            if (nopeus.Taulu == null) return nopeus.Vakio;
            var taulu = nopeus.Taulu;
            var arvo = taulu[0][1];
            for (var k = 0; k < taulu.Length; k += 1)
            {
                if (vuosiaSitten <= taulu[k][0]) arvo = taulu[k][1];
            }
            return arvo;
        }

        /// <summary>
        /// Ylityksen saapumisaika lähtöpään ajasta: lähtö aikaisintaan ikkunan
        /// avautuessa, ikkunan sulkeuduttua kiinni (0). Vuosia sitten.
        /// </summary>
        public static double YlityksenSaapuminen(double aikaA, double[] ikkuna, double kesto = 0)
        {
            if (!(aikaA > 0)) return 0;
            var lahto = Math.Min(aikaA, ikkuna[0]);
            if (lahto < ikkuna[1]) return 0;
            return lahto - kesto;
        }

        /* ------------------------------------------------------------- keko */

        /// <summary>Binäärikeko (Float32-avain, ruutu) täsmälleen webin luoKeko-järjestyksessä.</summary>
        sealed class Keko
        {
            float[] avaimet = new float[1 << 16];
            int[] arvot = new int[1 << 16];
            public int Koko;

            public void Lisaa(float avain, int arvo)
            {
                if (Koko == avaimet.Length)
                {
                    Array.Resize(ref avaimet, Koko * 2);
                    Array.Resize(ref arvot, Koko * 2);
                }
                var i = Koko++;
                avaimet[i] = avain;
                arvot[i] = arvo;
                while (i > 0)
                {
                    var p = (i - 1) >> 1;
                    if (avaimet[p] <= avaimet[i]) break;
                    var ta = avaimet[p]; avaimet[p] = avaimet[i]; avaimet[i] = ta;
                    var tr = arvot[p]; arvot[p] = arvot[i]; arvot[i] = tr;
                    i = p;
                }
            }

            public void Ota(out float avain, out int arvo)
            {
                avain = avaimet[0];
                arvo = arvot[0];
                Koko -= 1;
                if (Koko == 0) return;
                avaimet[0] = avaimet[Koko];
                arvot[0] = arvot[Koko];
                var i = 0;
                for (;;)
                {
                    var l = 2 * i + 1;
                    var r = l + 1;
                    var m = i;
                    if (l < Koko && avaimet[l] < avaimet[m]) m = l;
                    if (r < Koko && avaimet[r] < avaimet[m]) m = r;
                    if (m == i) break;
                    var ta = avaimet[m]; avaimet[m] = avaimet[i]; avaimet[i] = ta;
                    var tr = arvot[m]; arvot[m] = arvot[i]; arvot[i] = tr;
                    i = m;
                }
            }
        }

        /* ---------------------------------------------------------- Dijkstra */

        /// <summary>Yhden virran laskennan tila (webin laskeVirta-sulkeuma).</summary>
        sealed class Laskija
        {
            public float[] Tau, Meri, Avautuu;
            public int[] Edeltaja;
            public short[] NauhaPiste, NauhaNro;
            public byte[] Sallittu;
            public readonly Keko Keko = new Keko();

            /// <summary>Ruudun aika (ja edeltäjä) paremmaksi; tosi, jos parani.</summary>
            public bool Kirjaa(int i, double t, int mista)
            {
                // Portti: alueeseen ei pääse ennen sen avautumista.
                var tt = (float)Math.Max(t, -(double)Avautuu[i]);
                if (!(tt < Tau[i])) return false;
                Tau[i] = tt;
                Edeltaja[i] = mista;
                // Nauhamerkintä kuuluu voittaneelle saapumiselle: nollataan joka parannuksella.
                NauhaPiste[i] = -1;
                NauhaNro[i] = -1;
                Keko.Lisaa(tt, i);
                return true;
            }
        }

        struct Lisasarma
        {
            public int B;
            public double Avautuu, Sulkeutuu, Kesto;
        }

        /// <summary>
        /// Yhden virran saapumisajat. `lahteet` korvaa virran omat lähteet
        /// (laskeKentat lisää niihin toisen virran kentästä luetut).
        /// </summary>
        public static VirranKentta LaskeVirta(Virta virta, Ymparisto ymparisto, Lahde[] lahteet = null)
        {
            var maa = ymparisto.Maa;
            var rannikko = ymparisto.Rannikko;
            var leveys = ymparisto.Leveys;
            var korkeus = ymparisto.Korkeus;
            var siemen = ymparisto.Siemen;
            var koko = leveys * korkeus;
            var l = new Laskija
            {
                Tau = new float[koko],
                Meri = new float[koko],
                Avautuu = new float[koko],
                Edeltaja = new int[koko],
                NauhaPiste = new short[koko],
                NauhaNro = new short[koko],
                Sallittu = new byte[koko],
            };
            for (var i = 0; i < koko; i += 1)
            {
                l.Tau[i] = float.PositiveInfinity;
                l.Avautuu[i] = float.PositiveInfinity;
                l.Edeltaja[i] = -1;
                l.NauhaPiste[i] = -1;
                l.NauhaNro[i] = -1;
            }
            var sisamaa = virta.Sisamaa;
            var reuna = virta.Reuna;

            // Sallittu alue: `alue`-laatikot (tai kaikki) miinus `pois`-laatikot,
            // samalla siemenellä, jotta naapurivirtojen raja on yksi rosoinen viiva.
            var alueMaski = virta.Alue != null && virta.Alue.Length > 0
                ? Laatikot.LaatikkoMaski(virta.Alue, reuna, siemen, leveys, korkeus, maa) : null;
            var poisMaski = virta.Pois != null && virta.Pois.Length > 0
                ? Laatikot.LaatikkoMaski(virta.Pois, reuna, siemen, leveys, korkeus, maa) : null;
            for (var i = 0; i < koko; i += 1)
            {
                if (maa[i] == 0) continue;
                if (alueMaski != null && alueMaski[i] == 0) continue;
                if (poisMaski != null && poisMaski[i] != 0) continue;
                l.Sallittu[i] = 1;
            }

            // PORTIT: ruudun avautumisaika; ruutu voi kuulua useaan porttiin,
            // ja myöhäisin (pienin vuosia sitten) voittaa. Luisukaista laatikon
            // ulkopuolella avautuu neliöllisesti myöhemmin rajaa kohti.
            var portit = virta.Portit ?? new Portti[0];
            for (var n = 0; n < portit.Length; n += 1)
            {
                var portti = portit[n];
                var rosoreuna = portti.Reuna ?? reuna;
                var luisu = Laatikot.Luisu(portti);
                var hajonta = portti.Hajonta;
                var portinSiemen = siemen + 11 + n;
                var (r0, r1) = Laatikot.LaatikoidenRivit(portti.Alue, rosoreuna + (luisu?.Leveys ?? 0), korkeus);
                for (var r = r0; r <= r1; r += 1)
                {
                    var lat = Ruudukko.RivinLat(r);
                    for (var c = 0; c < leveys; c += 1)
                    {
                        var i = r * leveys + c;
                        if (maa[i] == 0) continue;
                        var lon = Ruudukko.SarakkeenLon(c);
                        var s = Laatikot.LaatikoidenSyvyys(lat, lon, portti.Alue, rosoreuna, portinSiemen);
                        double aika;
                        if (s >= 0)
                        {
                            aika = portti.Avautuu * (1 + hajonta * Laatikot.Kohina(lat, lon, siemen + 23 + n, 2));
                        }
                        else if (luisu.HasValue && s > -luisu.Value.Leveys)
                        {
                            var x = -s / luisu.Value.Leveys;
                            aika = portti.Avautuu + luisu.Value.Vuodet * x * x;
                        }
                        else continue;
                        if (aika < l.Avautuu[i]) l.Avautuu[i] = (float)aika;
                    }
                }
            }

            // Lähteet.
            foreach (var lahde in lahteet ?? virta.Lahteet ?? new Lahde[0])
            {
                var i = Ruudukko.LahinMaa(maa, lahde.Lat, lahde.Lon, 3, leveys, korkeus);
                if (i >= 0 && !double.IsNaN(lahde.Aika) && !double.IsInfinity(lahde.Aika)) l.Kirjaa(i, -lahde.Aika, -1);
            }

            // Nauhat: janan sisään jäävät ruudut saavat ajan janalta.
            var nauhat = virta.Nauhat ?? new Nauha[0];
            for (var nro = 0; nro < nauhat.Length; nro += 1) RasteroiNauha(nauhat[nro], l, maa, leveys, korkeus, nro);

            // Ylitykset: lisäsärmä a → b.
            var lisasarmat = new Dictionary<int, List<Lisasarma>>();
            foreach (var y in virta.Ylitykset ?? new Ylitys[0])
            {
                var a = Ruudukko.LahinMaa(maa, y.A.Lat, y.A.Lon, 3, leveys, korkeus);
                var b = Ruudukko.LahinMaa(maa, y.B.Lat, y.B.Lon, 3, leveys, korkeus);
                if (a < 0 || b < 0) continue;
                if (!lisasarmat.TryGetValue(a, out var lista)) lisasarmat[a] = lista = new List<Lisasarma>();
                lista.Add(new Lisasarma
                {
                    B = b,
                    Avautuu = y.Ikkuna != null && y.Ikkuna.Length > 0 ? y.Ikkuna[0] : double.PositiveInfinity,
                    Sulkeutuu = y.Ikkuna != null && y.Ikkuna.Length > 1 ? y.Ikkuna[1] : 0,
                    Kesto = y.Kesto,
                });
            }

            // Askelpituudet riveittäin: vaaka dx = askel·cos φ, pysty askel, vino hypot.
            const double askelKm = Ruudukko.KmAsteella * Ruudukko.Aste;
            var kmVaaka = new double[korkeus];
            var kmVino = new double[korkeus];
            for (var r = 0; r < korkeus; r += 1)
            {
                var cosLat = Math.Max(0.05, JsLuvut.Cos(Ruudukko.RivinLat(r) * Ruudukko.Rad));
                var dx = askelKm * cosLat;
                kmVaaka[r] = JsLuvut.Hypot(dx, 0);
                kmVino[r] = JsLuvut.Hypot(dx, askelKm);
            }
            var kmPysty = JsLuvut.Hypot(0, askelKm);

            var tau = l.Tau;
            var sallittu = l.Sallittu;
            var keko = l.Keko;
            var nopeusTaulu = virta.Nopeus;
            while (keko.Koko > 0)
            {
                keko.Ota(out var avain, out var u);
                if (avain > tau[u]) continue;
                double t = avain;
                var r = u / leveys;
                var c = u - r * leveys;
                var nopeus = NopeusHetkella(nopeusTaulu, -t);
                for (var dr = -1; dr <= 1; dr += 1)
                {
                    var rr = r + dr;
                    if (rr < 0 || rr >= korkeus) continue;
                    for (var dc = -1; dc <= 1; dc += 1)
                    {
                        if (dr == 0 && dc == 0) continue;
                        var v = rr * leveys + ((c + dc + leveys) % leveys);
                        if (sallittu[v] == 0) continue;
                        var km = dc != 0 ? (dr != 0 ? kmVino[r] : kmVaaka[r]) : kmPysty;
                        var kerroin = rannikko != null && rannikko[v] == 0 ? sisamaa : 1;
                        l.Kirjaa(v, t + km / (nopeus * kerroin), u);
                    }
                }
                if (lisasarmat.Count > 0 && lisasarmat.TryGetValue(u, out var ylitykset))
                {
                    foreach (var y in ylitykset)
                    {
                        // Rintama odottaa ikkunan avautumista; ikkunan jälkeen kiinni.
                        var lahto = Math.Max(t, -y.Avautuu);
                        if (lahto > -y.Sulkeutuu) continue;
                        if (sallittu[y.B] == 0 && maa[y.B] == 0) continue;
                        l.Kirjaa(y.B, lahto + y.Kesto, u);
                    }
                }
            }

            var aikaUlos = new float[koko];
            for (var i = 0; i < koko; i += 1) if (tau[i] < float.PositiveInfinity) aikaUlos[i] = -tau[i];
            return new VirranKentta
            {
                Tunnus = virta.Tunnus,
                Aika = aikaUlos,
                Meri = l.Meri,
                Edeltaja = l.Edeltaja,
                NauhaPiste = l.NauhaPiste,
                NauhaNro = l.NauhaNro,
                Nauhat = nauhat,
            };
        }

        /// <summary>
        /// Nauha reitiksi ruudukkoon: ruudut säteen sisällä saavat ajan janalta
        /// lineaarisesti, reunalla 15 % myöhäisempänä. Maaruudut kirjataan
        /// lähteiksi, meriruudut merikenttään.
        /// </summary>
        static void RasteroiNauha(Nauha nauha, Laskija l, byte[] maa, int leveys, int korkeus, int nro)
        {
            var pisteet = nauha.Pisteet ?? new double[0][];
            var sade = nauha.Sade;
            var meriSade = nauha.MeriSade ?? sade * 0.6;
            const double km = Ruudukko.KmAsteella;
            const double aste = Ruudukko.Aste;
            for (var k = 0; k + 1 < pisteet.Length; k += 1)
            {
                double lat1 = pisteet[k][0], lon1 = pisteet[k][1], t1 = pisteet[k][2];
                double lat2 = pisteet[k + 1][0], lon2 = pisteet[k + 1][1], t2 = pisteet[k + 1][2];
                var latMin = Math.Min(lat1, lat2) - sade / km - 1;
                var latMax = Math.Max(lat1, lat2) + sade / km + 1;
                var cosMin = Math.Max(0.1, JsLuvut.Cos(Math.Max(Math.Abs(lat1), Math.Abs(lat2)) * Ruudukko.Rad));
                var dLon = lon2 - lon1;
                while (dLon > 180) dLon -= 360;
                while (dLon < -180) dLon += 360;
                var lonA = lon1;
                var lonB = lon1 + dLon;
                var lonMin = Math.Min(lonA, lonB) - sade / (km * cosMin) - 1;
                var lonMax = Math.Max(lonA, lonB) + sade / (km * cosMin) + 1;
                var r0 = (int)Math.Max(0, Math.Floor((90 - latMax) / aste));
                var r1 = (int)Math.Min(korkeus - 1, Math.Floor((90 - latMin) / aste));
                for (var r = r0; r <= r1; r += 1)
                {
                    var lat = Ruudukko.RivinLat(r);
                    var cosLat = Math.Max(0.05, JsLuvut.Cos(lat * Ruudukko.Rad));
                    for (var lon = Math.Floor(lonMin / aste) * aste; lon <= lonMax; lon += aste)
                    {
                        var c = (int)Math.Floor((Ruudukko.KierraLon(lon + aste / 2) + 180) / aste);
                        var i = r * leveys + ((c % leveys) + leveys) % leveys;
                        // Etäisyys janaan tasossa, jossa pituusaste on skaalattu cos(lat):lla.
                        var px = (lon + aste / 2 - lonA) * cosLat * km;
                        var py = (lat - lat1) * km;
                        var vx = (lonB - lonA) * cosLat * km;
                        var vy = (lat2 - lat1) * km;
                        var pituus2 = vx * vx + vy * vy;
                        var u = pituus2 > 0 ? Math.Max(0, Math.Min(1, (px * vx + py * vy) / pituus2)) : 0;
                        var d = JsLuvut.Hypot(px - u * vx, py - u * vy);
                        var aika = (t1 + (t2 - t1) * u) * (1 - 0.15 * Math.Min(1, d / sade));
                        if (maa[i] != 0)
                        {
                            // Nauhan ruutu muistaa pisteensä: vana jatkuu nauhaa pitkin taaksepäin.
                            if (d <= sade && l.Sallittu[i] != 0 && l.Kirjaa(i, -aika, -1))
                            {
                                l.NauhaPiste[i] = (short)(u < 0.5 ? k : k + 1);
                                l.NauhaNro[i] = (short)nro;
                                l.Edeltaja[i] = -1;
                            }
                        }
                        else if (d <= meriSade)
                        {
                            if (l.Meri[i] == 0 || aika > l.Meri[i]) l.Meri[i] = (float)aika;
                        }
                    }
                }
            }
        }

        /* ---------------------------------------------------------- yhdistä */

        /// <summary>Virrat yhdeksi kentäksi: suurin aika (ensin saapunut) voittaa, tasapelissä aiempi virta.</summary>
        public static Yhdiste YhdistaVirrat(IReadOnlyList<VirranKentta> kentat, int koko = Ruudukko.Leveys * Ruudukko.Korkeus)
        {
            var aika = new float[koko];
            var virta = new sbyte[koko];
            var meri = new float[koko];
            var meriVirta = new sbyte[koko];
            for (var i = 0; i < koko; i += 1) { virta[i] = -1; meriVirta[i] = -1; }
            for (var n = 0; n < kentat.Count; n += 1)
            {
                var k = kentat[n];
                var ka = k.Aika;
                var km = k.Meri;
                for (var i = 0; i < koko; i += 1)
                {
                    var a = ka[i];
                    if (a > 0 && (virta[i] < 0 || a > aika[i])) { aika[i] = a; virta[i] = (sbyte)n; }
                    var m = km != null ? km[i] : 0f;
                    if (m > 0 && (meriVirta[i] < 0 || m > meri[i])) { meri[i] = m; meriVirta[i] = (sbyte)n; }
                }
            }
            return new Yhdiste { Aika = aika, Virta = virta, Meri = meri, MeriVirta = meriVirta };
        }

        /* ---------------------------------------------------------- kaikki */

        /// <summary>
        /// Koko kaaren kentät: virrat järjestyksessä (myöhempi saa lukea
        /// aiemman kentän `lahteetToisesta`-lähteillä), sammuva retkiläikkä ja
        /// vanhan väestön alue.
        /// </summary>
        public static Kentat LaskeKentat(VirtaAineisto aineisto, byte[] maa, int siemen = 1,
            int leveys = Ruudukko.Leveys, int korkeus = Ruudukko.Korkeus)
        {
            Kentat tulos = null;
            foreach (var vaihe in LaskeKentatVaiheittain(aineisto, maa, siemen, leveys, korkeus)) tulos = vaihe.Kentat ?? tulos;
            return tulos;
        }

        /// <summary>
        /// Sama vaiheittain: tuottaa virran kerrallaan (Vaihe = tunnus,
        /// Kentat = null) ja lopuksi Vaihe = "valmis" koko tuloksen kanssa.
        /// Unityssä vaiheet voi ajaa korutiinina tai säikeessä.
        /// </summary>
        public static IEnumerable<KenttaVaihe> LaskeKentatVaiheittain(VirtaAineisto aineisto, byte[] maa, int siemen = 1,
            int leveys = Ruudukko.Leveys, int korkeus = Ruudukko.Korkeus)
        {
            var rannikko = Ruudukko.RannikkoMaski(maa, leveys, korkeus);
            var ymparisto = new Ymparisto { Maa = maa, Rannikko = rannikko, Leveys = leveys, Korkeus = korkeus, Siemen = siemen };
            var kentat = new List<VirranKentta>();
            var kentta = new Dictionary<string, VirranKentta>();
            var siirtymat = new List<Siirtyma>();
            foreach (var virta in aineisto.Virrat)
            {
                var lahteet = new List<Lahde>(virta.Lahteet ?? new Lahde[0]);
                foreach (var l in virta.LahteetToisesta ?? new LahdeToisesta[0])
                {
                    kentta.TryGetValue(l.Virta ?? "", out var toinen);
                    var i = toinen != null ? Ruudukko.LahinMaa(maa, l.Lue.Lat, l.Lue.Lon, 4, leveys, korkeus) : -1;
                    var aika = i >= 0 ? YlityksenSaapuminen(toinen.Aika[i], l.Ikkuna, l.Kesto) : 0;
                    if (aika > 0)
                    {
                        lahteet.Add(new Lahde { Nimi = l.Nimi, Lat = l.Lat, Lon = l.Lon, Aika = aika });
                        // Siirtymä virrasta toiseen: vana hyppää lukupisteeseen (JohdaVanat).
                        siirtymat.Add(new Siirtyma
                        {
                            Tunnus = virta.Tunnus,
                            Kohde = Ruudukko.LahinMaa(maa, l.Lat, l.Lon, 3, leveys, korkeus),
                            Virta = l.Virta,
                            Lue = i,
                        });
                    }
                }
                var tulos = LaskeVirta(virta, ymparisto, lahteet.ToArray());
                if (virta.Tunnus != null) kentta[virta.Tunnus] = tulos;
                kentat.Add(tulos);
                yield return new KenttaVaihe { Vaihe = virta.Tunnus };
            }
            var yhdiste = YhdistaVirrat(kentat, leveys * korkeus);
            var retki = aineisto.Retki != null ? LaskeVirta(aineisto.Retki, ymparisto).Aika : null;
            // Vanhan väestön alue pehmeällä reunalla (paino 0…1), vain maalla.
            var vanha = aineisto.Vanha != null
                ? Laatikot.LaatikkoPehmea(aineisto.Vanha.Alue, aineisto.Vanha.Reuna, siemen + 41, aineisto.Vanha.Pehmeys, leveys, korkeus, maa)
                : null;
            yield return new KenttaVaihe
            {
                Vaihe = "valmis",
                Kentat = new Kentat
                {
                    Aika = yhdiste.Aika,
                    Virta = yhdiste.Virta,
                    Meri = yhdiste.Meri,
                    MeriVirta = yhdiste.MeriVirta,
                    Retki = retki,
                    Vanha = vanha,
                    Rannikko = rannikko,
                    Edeltajat = kentat,
                    Siirtymat = siirtymat,
                },
            };
        }
    }
}
