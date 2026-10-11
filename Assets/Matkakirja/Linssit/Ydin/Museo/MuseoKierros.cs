// TAIDEMUSEO: KIERROS JA VAPAA KULKU (Linssiseppä 10.10.2026; Raamattu MAITTAIN: "liikkuminen kuten kuumailmapallossa (valmis
// esittelykierros tai vapaa kulku, ja teoksen esittely kuuluu napista)"). Pallon kierroksen (KierrosLento) vaiheet salissa:
//  - Reitti on Linnanrakentajan sali.json:n reitti: pisteet, joilla on kohde (teospaikka) ja pysähdys, ovat pysähdyksiä; muut
//    ovat kulkupisteitä (ovet, gallerian pää). Siirtymä pysähdyksestä seuraavaan kulkee pisteiden kautta Catmull–Rom-kaarena
//    kävelyvauhtia (KavelyMs), etenemä pehmeällä käyrällä (Kamerakayrat.Pehmea): lähtö ja saapuminen levosta.
//  - Katse: pysähdyksessä reittipisteen katse (teoksen keskipiste); matkalla katse kääntyy kulkusuuntaan (3 m eteen silmän
//    korkeudella) ja takaisin seuraavaan teokseen, painona sin(π·e), joten käännös on pehmeä.
//  - Pysähdyksen kesto: reitin pysahdys_s, vähintään PysahdysMinS; kertojan aikaleimat korvaavat tämän, kun luennat tulevat.
//  - Tauko pysäyttää ajan (kamera paikallaan), Seuraava/Edellinen hyppäävät pysähdyksestä toiseen kävellen, Vapaa luovuttaa
//    kameran pelaajalle (VapaaLiike: eteen/sivulle/käännös/kallistus; seinät rajaavat, aukoista pääsee läpi), ja Kierrokselle
//    kävelee nykyisestä paikasta seuraavaan pysähdykseen.
//  - TEOSKIERROS (PT 11.10. 00.4x): kierros pysähtyy jokaisella kertojan teoksella (kierros.json, järjestys huoneittain);
//    pysähdys on teoksen katseluasento, ja siirtymä kulkee suoraan huoneen poikki ja osasta toiseen oviaukkojen kautta
//    (Ovet), joten muut teokset näkyvät seinillä matkalla. Ilman listaa kierros on LR:n reitti kuten ennen.
//  - LÄHELTÄ (omistaja 11.10. 09.2x, sitova: "katselukokemus mahdollisimman läheltä niin että seinää ei tarvitse näkyä juuri
//    ollenkaan"): pysähdyksessä teos (kehyksen sisäreuna) täyttää 95 % ruudun rajaavasta suunnasta, kamera saa tulla seinän
//    lähelle (KatseluVaraM, kehyksen syvyys + lähitaso). Siirtymä peruuttaa ensin teoksen edestä saliin (Takaa-piste, ~1,6 m)
//    ja tulee seuraavan teoksen eteen sen Takaa-pisteen kautta: sali ja muut teokset näkyvät vain siirtymissä.
// Puhdas C#: MuseoTestit.
using System;
using System.Collections.Generic;
using Matkakirja.Linssit.Dioraama;
using Matkakirja.Linssit.Kamera;

namespace Matkakirja.Linssit.Museo
{
    public enum MuseoVaihe { Siirtyy, Pysahtyy, Vapaa, Valmis }

    public readonly struct MuseoAsento
    {
        public readonly V3 P, Katse;
        public MuseoAsento(V3 p, V3 katse) { P = p; Katse = katse; }
        public V3 Suunta { get { var d = Katse - P; double l = d.Pituus; return l < 1e-9 ? new V3(0, 0, -1) : d * (1 / l); } }
        public override string ToString() => $"{P} → {Katse}";
    }

    public sealed class MuseoKierros
    {
        public const double KavelyMs = 1.1, SiirtymaMinS = 2.5, PysahdysMinS = 6, SilmaY = 1.6, SeinaVaraM = 0.35, KatseEteenM = 3;
        public const double VapaaMs = 1.4, VapaaKaantoAs = 70, KallistusMax = 35, LaskuS = 0.4;

        readonly Sali sali;
        /// <summary>LR:n reitti (sali.Reitti) tai teoskierroksen pisteet: alku + yksi pysähdys teosta kohden.</summary>
        readonly List<Reittipiste> reitti;
        readonly bool teoskierros;
        /// <summary>Teoskierroksen tunnukset, joita salissa ei ole ripustettuna (sovitin kirjaa).</summary>
        public readonly List<string> Puuttuvat = new List<string>();
        /// <summary>Reittipisteiden indeksit, joissa on pysähdys (kohde + pysähdysaika).</summary>
        public readonly List<int> Pysahdykset = new List<int>();
        public MuseoVaihe Vaihe { get; private set; }
        public bool Tauolla { get; private set; }
        /// <summary>Pysähdys, jolle ollaan menossa tai jossa ollaan (indeksi Pysahdykset-listaan).</summary>
        public int Kohta { get; private set; }
        public MuseoAsento Nykyinen { get; private set; }
        public double VaiheenAika { get; private set; }
        public double VaiheenKesto { get; private set; }
        /// <summary>Kasvaa joka vaihteessa (UI päivittää otsikon).</summary>
        public int Versio { get; private set; }

        List<V3> polku = new List<V3>();
        List<double> polunMatka = new List<double>();
        /// <summary>Kaaripituustaulukko: näytteen matka ja parametri u = väli + t (tasainen kävelyvauhti epätasaisillakin väleillä).</summary>
        readonly List<double> naytteetS = new List<double>(), naytteetU = new List<double>();
        MuseoAsento lahto;
        double yaw, pitch, vapaaY = SilmaY;

        /// <param name="teokset">Teoskierros: pysähdykset näille teoksille tässä järjestyksessä (null = LR:n reitti).</param>
        public MuseoKierros(Sali s, IList<string> teokset = null)
        {
            sali = s;
            if (teokset == null)
            {
                reitti = s.Reitti;
                for (int i = 0; i < reitti.Count; i++)
                    if (reitti[i].Kohde != null && reitti[i].PysahdysS > 0 && s.HaeRipustus(reitti[i].Kohde) != null) Pysahdykset.Add(i);   // ripustamaton paikka tai veistos = kulkupiste
            }
            else
            {
                teoskierros = true;
                var a0 = s.Reitti.Count > 0 ? s.Reitti[0] : null;
                reitti = new List<Reittipiste> { new Reittipiste { P = a0?.P ?? new V3(0, SilmaY, 0), Katse = a0?.Katse ?? new V3(0, SilmaY, -5) } };
                foreach (var id in teokset)
                {
                    var r = s.Ripustukset.Find(x => x.Teos.Id == id);
                    if (r == null) { Puuttuvat.Add(id); continue; }
                    var a = Katseluasento(r, 4.0 / 3);   // sovitin sovittaa ruudun kuvasuhteeseen (SovitaPysahdykset)
                    var c = r.Paikka.Keskipiste; var n = r.Paikka.Normaali;
                    var p = a?.P ?? new V3(c.X + n.X * 1.5, SilmaY, c.Z + n.Z * 1.5);
                    reitti.Add(new Reittipiste { P = p, Katse = a?.Katse ?? new V3(c.X, SilmaY, c.Z), PysahdysS = PysahdysMinS, Kohde = r.Paikka.Id });
                    Pysahdykset.Add(reitti.Count - 1);
                    if (TakaaPiste(r, p) is V3 tp) takaa[reitti.Count - 1] = tp;
                }
            }
            var alku = reitti.Count > 0 ? reitti[0] : new Reittipiste { P = new V3(0, SilmaY, 0), Katse = new V3(0, SilmaY, -5) };
            Nykyinen = new MuseoAsento(alku.P, alku.Katse);
            Kohta = 0;
            AloitaSiirtyma(0, 0);
        }

        public Reittipiste Pysahdys(int k) => k >= 0 && k < Pysahdykset.Count ? reitti[Pysahdykset[k]] : null;
        /// <summary>Teoskierroksen pysähdyksen peruutuspiste salissa (reitin indeksi → piste silmän korkeudella); ei LR:n reitillä.</summary>
        readonly Dictionary<int, V3> takaa = new Dictionary<int, V3>();
        V3? vapaaTaakse;
        /// <summary>Ripustus, jonka luona ollaan (vain pysähdyksessä tai sinne tullessa); vapaassa tilassa katsottu teos.</summary>
        public Ripustus NykyinenTeos => Vaihe == MuseoVaihe.Vapaa ? KatsottuTeos() : Pysahdys(Kohta) is { } r ? sali.HaeRipustus(r.Kohde) : null;

        /// <summary>Viimeksi ohitettu reittipiste (kulkupisteet lasketaan siitä eteen- tai taaksepäin).</summary>
        int Mista => Vaihe == MuseoVaihe.Pysahtyy ? Pysahdykset[Kohta] : Kohta > 0 ? Pysahdykset[Kohta - 1] : 0;

        /// <summary>Siirtymä nykyisestä asennosta pysähdykseen k reittipisteiden kautta (edellinen = viimeksi ohitettu reittipiste).</summary>
        void AloitaSiirtyma(int k, int edellinen)
        {
            if (k >= Pysahdykset.Count) { Vaihe = MuseoVaihe.Valmis; Versio++; return; }
            Kohta = k;
            int loppu = Pysahdykset[k];
            polku = new List<V3> { Nykyinen.P };
            // Kulkupisteet edellisen ja seuraavan pysähdyksen välissä (taaksepäin hypättäessä samat käänteisesti); teoskierroksella
            // teoksen edestä peruuttaen saliin ja seuraavan eteen sen peruutuspisteen kautta. Osasta toiseen oviaukkojen kautta (Ovet).
            if (teoskierros)
            {
                if (LahdonTakaa() is V3 l) polku.Add(l);
                if (takaa.TryGetValue(loppu, out var tk)) polku.Add(tk);
            }
            else if (edellinen < loppu) for (int i = edellinen + 1; i < loppu; i++) polku.Add(reitti[i].P);
            else for (int i = edellinen - 1; i > loppu; i--) polku.Add(reitti[i].P);
            polku.Add(reitti[loppu].P);
            polku = Karsi(Ovet(polku));
            Mittaa();
            lahto = Nykyinen;
            Vaihe = MuseoVaihe.Siirtyy;
            VaiheenAika = 0;
            VaiheenKesto = Math.Max(SiirtymaMinS, polunMatka[polunMatka.Count - 1] / KavelyMs + KaantoS(lahto, reitti[loppu]));
            Versio++;
        }

        static double KaantoS(MuseoAsento a, Reittipiste b)
        {
            var d1 = a.Suunta; var d2 = b.Katse - b.P; double l = d2.Pituus; if (l < 1e-9) return 0;
            double c = Math.Max(-1, Math.Min(1, (d1.X * d2.X + d1.Z * d2.Z) / (l * Math.Sqrt(d1.X * d1.X + d1.Z * d1.Z + 1e-12))));
            return Math.Acos(c) / Math.PI * 1.5;   // 180° käännös = 1,5 s lisää
        }

        static List<V3> Karsi(List<V3> p)
        {
            var r = new List<V3>();
            foreach (var x in p) if (r.Count == 0 || (x - r[r.Count - 1]).Pituus > 0.05) r.Add(x);
            if (r.Count == 1) r.Add(r[0]);
            return r;
        }

        public const double OviM = 0.6;

        /// <summary>Polku, jonka peräkkäiset pisteet eri osissa yhdistetään oviaukkojen kautta (lyhin ketju osasta toiseen): aukon
        /// molemmin puolin piste OviM:n päässä seinästä aukon keskellä silmän korkeudella. Ei kulje seinän läpi.</summary>
        List<V3> Ovet(List<V3> p)
        {
            var r = new List<V3>();
            for (int i = 0; i < p.Count; i++) { if (i > 0) r.AddRange(Ovipisteet(p[i - 1], p[i])); r.Add(p[i]); }
            return r;
        }

        List<V3> Ovipisteet(V3 a, V3 b)
        {
            var r = new List<V3>();
            Osa oa = sali.OsaPisteessa(a), ob = sali.OsaPisteessa(b);
            if (oa == null || ob == null || oa == ob) return r;
            var edel = new Dictionary<Osa, (Osa Osa, Aukko Aukko)> { [oa] = (null, null) };
            var jono = new Queue<Osa>(); jono.Enqueue(oa);
            while (jono.Count > 0 && !edel.ContainsKey(ob))
            {
                var o = jono.Dequeue();
                foreach (var au in sali.Aukot)
                {
                    if (au.Osat.Length < 2) continue;
                    Osa x = sali.HaeOsa(au.Osat[0]), y = sali.HaeOsa(au.Osat[1]);
                    var m = o == x ? y : o == y ? x : null;
                    if (m == null || edel.ContainsKey(m)) continue;
                    edel[m] = (o, au); jono.Enqueue(m);
                }
            }
            if (!edel.ContainsKey(ob)) return r;
            var ketju = new List<(Osa Mista, Aukko Aukko)>();
            for (var o = ob; edel[o].Osa != null; o = edel[o].Osa) ketju.Add(edel[o]);
            ketju.Reverse();
            foreach (var (mista, au) in ketju)
            {
                var o0 = sali.HaeOsa(au.Osat[0]);
                bool xs = au.Seina == "-x" || au.Seina == "+x";
                double taso = au.Seina switch { "-x" => o0.X0, "+x" => o0.X1, "-z" => o0.Z0, _ => o0.Z1 };
                double sis = au.Seina.StartsWith("-") ? 1 : -1;   // osa 0:n sisäpuoli
                double t0 = taso + sis * OviM, t1 = taso - sis * (au.Syvyys + OviM);
                V3 P(double t) => xs ? new V3(t, SilmaY, au.Keskipiste) : new V3(au.Keskipiste, SilmaY, t);
                bool osasta0 = mista == o0;
                r.Add(P(osasta0 ? t0 : t1)); r.Add(P(osasta0 ? t1 : t0));
            }
            return r;
        }

        const int NaytteitaValilla = 16;

        /// <summary>Polun kaaren pituus näytteistä (välien loppumatkat polunMatkaan ja kaaripituustaulukko Polullalle).</summary>
        void Mittaa()
        {
            polunMatka = new List<double> { 0 }; naytteetS.Clear(); naytteetU.Clear();
            naytteetS.Add(0); naytteetU.Add(0);
            double s = 0;
            for (int i = 0; i + 1 < polku.Count; i++)
            {
                V3 ed = polku[i];
                for (int k = 1; k <= NaytteitaValilla; k++)
                {
                    double t = k / (double)NaytteitaValilla; var q = Kaari(polku, i, t);
                    s += (q - ed).Pituus; ed = q;
                    naytteetS.Add(s); naytteetU.Add(i + t);
                }
                polunMatka.Add(s);
            }
        }

        /// <summary>Sentripetaalinen Catmull–Rom välillä i → i+1 (ei silmukoita eikä ylitystä, vaikka välit ovat eri mittaisia, esim.
        /// oviaukon pisteparit huoneen poikki kulkevien välien välissä); päätepisteissä peilattu apupiste.</summary>
        static V3 Kaari(List<V3> p, int i, double t)
        {
            V3 p1 = p[i], p2 = p[Math.Min(p.Count - 1, i + 1)];
            V3 p0 = i > 0 ? p[i - 1] : 2 * p1 - p2, p3 = i + 2 < p.Count ? p[i + 2] : 2 * p2 - p1;
            double d01 = Math.Sqrt(Math.Max(1e-6, (p1 - p0).Pituus)), d12 = Math.Sqrt(Math.Max(1e-6, (p2 - p1).Pituus)), d23 = Math.Sqrt(Math.Max(1e-6, (p3 - p2).Pituus));
            double t0 = 0, t1 = d01, t2 = t1 + d12, t3 = t2 + d23, u = t1 + t * (t2 - t1);
            V3 a1 = (t1 - u) / (t1 - t0) * p0 + (u - t0) / (t1 - t0) * p1;
            V3 a2 = (t2 - u) / (t2 - t1) * p1 + (u - t1) / (t2 - t1) * p2;
            V3 a3 = (t3 - u) / (t3 - t2) * p2 + (u - t2) / (t3 - t2) * p3;
            V3 b1 = (t2 - u) / (t2 - t0) * a1 + (u - t0) / (t2 - t0) * a2;
            V3 b2 = (t3 - u) / (t3 - t1) * a2 + (u - t1) / (t3 - t1) * a3;
            return (t2 - u) / (t2 - t1) * b1 + (u - t1) / (t2 - t1) * b2;
        }

        /// <summary>Piste polulla matkan s kohdalla (ja suunta eteenpäin).</summary>
        V3 Polulla(double s)
        {
            double L = polunMatka[polunMatka.Count - 1];
            s = Math.Max(0, Math.Min(L, s));
            int lo = 0, hi = naytteetS.Count - 1;
            while (hi - lo > 1) { int m = (lo + hi) / 2; if (naytteetS[m] < s) lo = m; else hi = m; }
            double ds = naytteetS[hi] - naytteetS[lo];
            double u = naytteetU[lo] + (ds < 1e-9 ? 1 : (s - naytteetS[lo]) / ds) * (naytteetU[hi] - naytteetU[lo]);
            int i = Math.Min(polku.Count - 2, Math.Max(0, (int)Math.Floor(u)));
            return Kaari(polku, i, Math.Max(0, Math.Min(1, u - i)));
        }

        public void Paivita(double dt)
        {
            if (Tauolla || Vaihe == MuseoVaihe.Vapaa || Vaihe == MuseoVaihe.Valmis) return;
            VaiheenAika += dt;
            if (Vaihe == MuseoVaihe.Siirtyy)
            {
                var kohde = reitti[Pysahdykset[Kohta]];
                double e = Kamerakayrat.Pehmea(Math.Min(1, VaiheenAika / VaiheenKesto));
                double L = polunMatka[polunMatka.Count - 1];
                var p = Polulla(e * L);
                // Katse: lähdön katse → kulkusuunta → kohteen katse (paino sin(πe) kulkusuunnalle, ei matkalla jos lyhyt).
                var eteen = Polulla(e * L + KatseEteenM);
                if ((eteen - p).Pituus < 0.2) eteen = kohde.Katse; else eteen = new V3(eteen.X, SilmaY, eteen.Z) + (eteen - p) * 2;
                var paat = V3.Lerp(lahto.Katse, kohde.Katse, e);
                double w = L > 3 ? Math.Sin(Math.PI * e) * 0.85 : 0;
                // Katse vaakatasossa silmän korkeudella (simu 11.10. 09.42: korkealla roikkuvalta teokselta laskeutuessa katse jäi
                // teoksen korkeudelle ja kamera katsoi kattoon); pysähdysten katseet ovat vaakasuoria, joten saapuminen ei muutu.
                var kt = V3.Lerp(paat, eteen, w);
                Nykyinen = new MuseoAsento(p, new V3(kt.X, p.Y, kt.Z));
                if (VaiheenAika >= VaiheenKesto)
                {
                    Nykyinen = new MuseoAsento(kohde.P, kohde.Katse);
                    Vaihe = MuseoVaihe.Pysahtyy; VaiheenAika = 0; VaiheenKesto = Math.Max(PysahdysMinS, kohde.PysahdysS); Versio++;
                }
            }
            else if (Vaihe == MuseoVaihe.Pysahtyy && VaiheenAika >= VaiheenKesto) AloitaSiirtyma(Kohta + 1, Mista);
        }

        /// <summary>Pysähdys kestää vähintään s sekuntia (kertojan äänite, MuseoKertoja); vain pysähdyksessä.</summary>
        public void PidennaPysahdys(double s) { if (Vaihe == MuseoVaihe.Pysahtyy && s > VaiheenKesto) VaiheenKesto = s; }

        public void Tauko(bool paalla) { if (Tauolla != paalla) { Tauolla = paalla; Versio++; } }

        /// <summary>Seuraava pysähdys (kävellen nykyisestä paikasta); viimeisen jälkeen kierros on valmis.</summary>
        public void Seuraava() { if (Vaihe == MuseoVaihe.Valmis) return; Tauolla = false; AloitaSiirtyma(Math.Min(Pysahdykset.Count, Kohta + 1), Mista); }
        public void Edellinen()
        {
            Tauolla = false;
            int mista = Vaihe == MuseoVaihe.Valmis ? Pysahdykset[Pysahdykset.Count - 1] : Mista;
            int k = Vaihe == MuseoVaihe.Valmis ? Pysahdykset.Count - 1 : Math.Max(0, Kohta - 1);
            AloitaSiirtyma(k, mista);
        }
        public void Siirry(int k) { Tauolla = false; int m = Vaihe == MuseoVaihe.Valmis ? Pysahdykset[Pysahdykset.Count - 1] : Mista; AloitaSiirtyma(Math.Max(0, Math.Min(Pysahdykset.Count - 1, k)), m); }

        /// <summary>Vapaa kulku nykyisestä asennosta.</summary>
        public void Vapaa()
        {
            var d = Nykyinen.Suunta;
            yaw = Math.Atan2(d.X, -d.Z) * 180 / Math.PI;
            pitch = Math.Asin(Math.Max(-1, Math.Min(1, d.Y))) * 180 / Math.PI;
            Nykyinen = new MuseoAsento(Nykyinen.P, Nykyinen.P + d);   // silmä laskeutuu pysähdyksen korkeudelta pehmeästi (VapaaLiike)
            vapaaY = SilmaY;
            vapaaTaakse = Sallittu(Nykyinen.P) ? (V3?)null : LahdonTakaa();   // teoksen edestä (seinän vierestä) liukuen kävelyalueelle
            Vaihe = MuseoVaihe.Vapaa; Tauolla = false; VaiheenAika = 0; Versio++;
        }

        /// <summary>Vapaasta kierrokselle: kävellen lähimpään pysähdykseen (eteenpäin suosien nykyistä kohtaa).</summary>
        public void Kierrokselle()
        {
            if (Vaihe != MuseoVaihe.Vapaa) return;
            int paras = Kohta; double pm = double.MaxValue;
            for (int k = 0; k < Pysahdykset.Count; k++)
            {
                double d = (reitti[Pysahdykset[k]].P - Nykyinen.P).Pituus;
                if (d < pm) { pm = d; paras = k; }
            }
            Vaihe = MuseoVaihe.Siirtyy;
            AloitaSiirtyma(paras, Pysahdykset[paras]);
            // Polku suoraan nykyisestä paikasta (ei edellisen pysähdyksen kulkupisteitä), teoksen eteen peruutuspisteen kautta.
            var pk = new List<V3> { Nykyinen.P };
            if (takaa.TryGetValue(Pysahdykset[paras], out var tk)) pk.Add(tk);
            pk.Add(reitti[Pysahdykset[paras]].P);
            polku = Karsi(Ovet(pk));
            Mittaa();
            VaiheenKesto = Math.Max(SiirtymaMinS, polunMatka[polunMatka.Count - 1] / KavelyMs + KaantoS(Nykyinen, reitti[Pysahdykset[paras]]));
        }

        /// <summary>Vapaa liike: eteen (m/s-osuus −1…1), sivulle, käännös (aste-osuus), kallistus; dt sekunteina.
        /// Seinät rajaavat akseleittain (liukuu seinää pitkin), aukoista pääsee läpi.</summary>
        public void VapaaLiike(double eteen, double sivulle, double kaanto, double kallistus, double dt)
        {
            // Silmän korkeus lähestyy vapaaY:tä (vapaaseen siirryttäessä pysähdyksen katseluasennosta kävelykorkeudelle 1,6 m;
            // PT 11.10. 09.0x: ennen hyppy jopa 1,4 m): eksponentiaalinen lähestyminen, aikavakio LaskuS.
            if (Vaihe != MuseoVaihe.Vapaa) return;
            yaw += kaanto * VapaaKaantoAs * dt;
            pitch = Math.Max(-KallistusMax, Math.Min(KallistusMax, pitch + kallistus * VapaaKaantoAs * dt));
            double yr = yaw * Math.PI / 180, pr = pitch * Math.PI / 180;
            var f = new V3(Math.Sin(yr), 0, -Math.Cos(yr)); var r = new V3(Math.Cos(yr), 0, Math.Sin(yr));
            var p = Nykyinen.P;
            if (vapaaTaakse is V3 vt)
            {
                double w = 1 - Math.Exp(-dt / LaskuS);
                p = new V3(p.X + (vt.X - p.X) * w, p.Y, p.Z + (vt.Z - p.Z) * w);
                if (Sallittu(p) || Math.Abs(vt.X - p.X) + Math.Abs(vt.Z - p.Z) < 0.01) vapaaTaakse = null;
            }
            if (Math.Abs(p.Y - vapaaY) > 1e-4) p = new V3(p.X, vapaaY + (p.Y - vapaaY) * Math.Exp(-dt / LaskuS), p.Z);
            var siirto = (f * eteen + r * sivulle) * (VapaaMs * dt);
            var px = new V3(p.X + siirto.X, p.Y, p.Z); if (Sallittu(px)) p = px;
            var pz = new V3(p.X, p.Y, p.Z + siirto.Z); if (Sallittu(pz)) p = pz;
            var suunta = new V3(Math.Sin(yr) * Math.Cos(pr), Math.Sin(pr), -Math.Cos(yr) * Math.Cos(pr));
            Nykyinen = new MuseoAsento(p, p + suunta);
        }

        // --- Katseluasento (PT 11.10. 00.3x KIIRE, omistaja TF 180: "Taulut näkyvät liian kaukaa ja matalalta") -----------------
        /// <summary>Museokameran pystysuora näkökenttä (MuseoNayttamo.Kamera.fieldOfView).</summary>
        public const double KameraFovAste = 58;
        /// <summary>Teos kehyksineen täyttää tämän osan ruudun korkeudesta (PT 11.10. 09.0x: kauempaa, seinää ja kehystä näkyy luontevasti; enintään TayttoLeveys leveydestä) ja sen keskipiste on
        /// KeskiY:n kohdalla ylhäältä: vapaa kaista nimikyltin (ylin ~15 %) ja ohjausnappien (alin ~20 %) välissä.</summary>
        public const double TayttoKorkeus = 0.95, TayttoLeveys = 0.95, KeskiY = 0.5, LahinM = 0.12, PaspisM = 0.065;
        /// <summary>Katseluasennon vara osan seinistä (ei kävelyn SeinaVaraM: kamera saa tulla teoksen eteen) ja peruutuspisteen etäisyys.</summary>
        public const double KatseluVaraM = 0.08, TakaaM = 1.6, LahitasoM = 0.05;
        readonly Dictionary<int, (V3 P, V3 Katse)> lrAsennot = new Dictionary<int, (V3, V3)>();
        public double Kuvasuhde { get; private set; }

        /// <summary>Teoksen katseluasento: silmä teoksen keskikorkeudella ja katse kohtisuoraan seinään (ei vinoa perspektiiviä),
        /// etäisyys teoksen ulkomitoista (kehys, passepartout) ja ruudun kuvasuhteesta (leveys/korkeus). Jos piste ei ole sallittu
        /// (seinä, toinen huone), lähemmäs 0,1 m kerrallaan; null, jos mikään ei käy.</summary>
        public MuseoAsento? Katseluasento(Ripustus r, double kuvasuhde)
        {
            if (r?.Paikka == null || kuvasuhde <= 0) return null;
            var pk = r.Paikka;
            var (W, H) = Nakoala(r);
            double t = Math.Tan(KameraFovAste / 2 * Math.PI / 180);
            double dMin = LahinEtaisyys(r);
            double d = Math.Max(dMin, Math.Max(H / 2 / (TayttoKorkeus * t), W / 2 / (TayttoLeveys * kuvasuhde * t)));
            var n = pk.Normaali; double nl = Math.Sqrt(n.X * n.X + n.Z * n.Z); if (nl < 1e-9) return null;
            double nx = n.X / nl, nz = n.Z / nl;
            var c = pk.Keskipiste;
            for (; d >= dMin - 1e-9; d -= 0.05)
            {
                double silma = c.Y - (0.5 - KeskiY) * 2 * d * t;
                var p = new V3(c.X + nx * d, silma, c.Z + nz * d);
                if (SallittuKatselu(p)) return new MuseoAsento(p, new V3(p.X - nx * KatseEteenM, silma, p.Z - nz * KatseEteenM));
            }
            return null;
        }

        /// <summary>Kehyksen sisäreunan mitat (m): kangas + passepartout (grafiikka). Omistaja 11.10.: tämä täyttää ruudun.</summary>
        public (double W, double H) Nakoala(Ripustus r)
        {
            double paspis = r.Paikka.Grafiikka ? 2 * PaspisM : 0;
            return (r.Leveys + paspis, r.Korkeus + paspis);
        }

        /// <summary>Lähin katseluetäisyys: kehyksen syvyys seinästä + lähitaso + vara (kehys ei leikkaudu), vähintään LahinM.</summary>
        public double LahinEtaisyys(Ripustus r)
        {
            double syv = 0;
            if (sali.Kehykset.TryGetValue(r.Paikka.Kehysprofiili ?? sali.Oletuskehys ?? "", out var prof)) foreach (var q in prof.Pisteet) syv = Math.Max(syv, q.Y / 100);
            return Math.Max(LahinM, syv + LahitasoM + 0.05);
        }

        /// <summary>Katseluasennon paikka sallittu: osan sisällä KatseluVaraM:n päässä seinistä tai kävelyalueella.</summary>
        public bool SallittuKatselu(V3 p)
        {
            foreach (var o in sali.Osat)
                if (p.X > o.X0 + KatseluVaraM && p.X < o.X1 - KatseluVaraM && p.Z > o.Z0 + KatseluVaraM && p.Z < o.Z1 - KatseluVaraM) return true;
            return Sallittu(p);
        }

        /// <summary>Peruutuspiste salissa teoksen edestä: normaalin suuntaan noin TakaaM (vähintään 0,4 m katseluasentoa kauempana),
        /// kävelyalueella silmän korkeudella; null, jos sellaista ei löydy 5 m:n sisältä.</summary>
        V3? TakaaPiste(Ripustus r, V3 katselu)
        {
            var n = r.Paikka.Normaali; double nl = Math.Sqrt(n.X * n.X + n.Z * n.Z); if (nl < 1e-9) return null;
            double nx = n.X / nl, nz = n.Z / nl; var c = r.Paikka.Keskipiste;
            double d0 = Math.Sqrt((katselu.X - c.X) * (katselu.X - c.X) + (katselu.Z - c.Z) * (katselu.Z - c.Z));
            for (double d = Math.Max(TakaaM, d0 + 0.4); d >= d0 + 0.4 - 1e-9; d -= 0.1)
            { var p = new V3(c.X + nx * d, SilmaY, c.Z + nz * d); if (Sallittu(p)) return p; }
            for (double d = Math.Max(TakaaM, d0 + 0.4); d <= 5; d += 0.1)
            { var p = new V3(c.X + nx * d, SilmaY, c.Z + nz * d); if (Sallittu(p)) return p; }
            return null;
        }

        /// <summary>Lähdön peruutuspiste: pysähdyksen Takaa-piste, jos ollaan pysähdyksen kohdalla, tai kävelyalueen ulkopuolelta
        /// taaksepäin katsesuunnasta (vapaa kulku seinän vierestä).</summary>
        V3? LahdonTakaa()
        {
            foreach (int i in Pysahdykset)
                if ((reitti[i].P - Nykyinen.P).Pituus < 0.05) return takaa.TryGetValue(i, out var t) ? t : (V3?)null;
            if (Sallittu(Nykyinen.P)) return null;
            var d = Nykyinen.Suunta; double l = Math.Sqrt(d.X * d.X + d.Z * d.Z); if (l < 1e-9) return null;
            for (double s = 0.1; s <= 3; s += 0.1)
            { var p = new V3(Nykyinen.P.X - d.X / l * s, SilmaY, Nykyinen.P.Z - d.Z / l * s); if (Sallittu(p)) return p; }
            return null;
        }

        /// <summary>Teoksen ulkomitat seinällä (m): kangas + passepartout (grafiikka) + kehysprofiilin leveys molemmin puolin.</summary>
        public (double W, double H) Ulkomitat(Ripustus r) => Ulkomitat(sali, r);

        public static (double W, double H) Ulkomitat(Sali sali, Ripustus r)
        {
            var pk = r.Paikka;
            double kehys = sali.Kehykset.TryGetValue(pk.Kehysprofiili ?? sali.Oletuskehys ?? "", out var prof) ? prof.LeveysCm / 100 : 0.08;
            double paspis = pk.Grafiikka ? 2 * PaspisM : 0;
            return (r.Leveys + paspis + 2 * kehys, r.Korkeus + paspis + 2 * kehys);
        }

        /// <summary>Pysähdysten asennot teoksista ruudun kuvasuhteelle (sovitin kutsuu avauksessa ja kuvasuhteen muuttuessa; LR:n
        /// reittipiste jää, jos katseluasentoa ei löydy). Pysähdyksessä ollessa asento vaihtuu heti (kierto).</summary>
        public void SovitaPysahdykset(double kuvasuhde)
        {
            if (kuvasuhde <= 0 || Math.Abs(kuvasuhde - Kuvasuhde) < 0.01) return;
            Kuvasuhde = kuvasuhde;
            foreach (int i in Pysahdykset)
            {
                var rp = reitti[i];
                if (!lrAsennot.TryGetValue(i, out var lr)) lrAsennot[i] = lr = (rp.P, rp.Katse);
                var rr = sali.HaeRipustus(rp.Kohde);
                var a = Katseluasento(rr, kuvasuhde);
                rp.P = a?.P ?? lr.P; rp.Katse = a?.Katse ?? lr.Katse;
                if (teoskierros && rr != null) { if (TakaaPiste(rr, rp.P) is V3 tp) takaa[i] = tp; else takaa.Remove(i); }
            }
            if (Vaihe == MuseoVaihe.Pysahtyy) { var k = reitti[Pysahdykset[Kohta]]; Nykyinen = new MuseoAsento(k.P, k.Katse); Versio++; }
            else if (Vaihe == MuseoVaihe.Siirtyy && polku != null && polku.Count > 1)
            { polku[polku.Count - 1] = reitti[Pysahdykset[Kohta]].P; Mittaa(); }   // matkalla oleva siirtymä uuteen päätepisteeseen
        }

        /// <summary>QA (kuva-arkki kaikista teoksista): vapaa kulku teoksen katseluasentoon nykyisellä kuvasuhteella.</summary>
        public bool NaytaTeos(Ripustus r)
        {
            var a = Katseluasento(r, Kuvasuhde > 0 ? Kuvasuhde : 4.0 / 3);
            if (a == null) return false;
            if (Vaihe != MuseoVaihe.Vapaa) Vapaa();
            var d = a.Value.Suunta;
            yaw = Math.Atan2(d.X, -d.Z) * 180 / Math.PI; pitch = 0;
            Nykyinen = a.Value; vapaaY = a.Value.P.Y; vapaaTaakse = null; Versio++;   // QA-kuva: silmä pysyy katseluasennon korkeudella
            return true;
        }

        /// <summary>QA (LS2 10.10.: kierroksen ulkopuoliset salit kuvaan): vapaa kulku pisteeseen (x, z) suuntaan yaw/pitch (astetta;
        /// yaw 0 = −Z, 90 = +X). Palauttaa false, jos paikka ei ole sallittu (seinässä tai salin ulkopuolella).</summary>
        public bool Aseta(double x, double z, double yawAste, double pitchAste = 0)
        {
            var p = new V3(x, SilmaY, z);
            if (!Sallittu(p)) return false;
            if (Vaihe != MuseoVaihe.Vapaa) Vapaa();
            yaw = yawAste; pitch = Math.Max(-KallistusMax, Math.Min(KallistusMax, pitchAste));
            Nykyinen = new MuseoAsento(p, p); vapaaY = SilmaY; vapaaTaakse = null;
            VapaaLiike(0, 0, 0, 0, 0);
            Versio++;
            return true;
        }

        /// <summary>Kävijän paikka sallittu: osan sisällä seinävaran päässä tai aukon käytävässä.</summary>
        public bool Sallittu(V3 p)
        {
            foreach (var o in sali.Osat)
                if (p.X > o.X0 + SeinaVaraM && p.X < o.X1 - SeinaVaraM && p.Z > o.Z0 + SeinaVaraM && p.Z < o.Z1 - SeinaVaraM) return true;
            foreach (var a in sali.Aukot)
            {
                var o = a.Osat.Length > 0 ? sali.HaeOsa(a.Osat[0]) : null; if (o == null) continue;
                double u0 = a.Keskipiste - a.Leveys / 2 + 0.2, u1 = a.Keskipiste + a.Leveys / 2 - 0.2;
                bool xSeina = a.Seina == "-x" || a.Seina == "+x";
                double taso = a.Seina switch { "-x" => o.X0, "+x" => o.X1, "-z" => o.Z0, _ => o.Z1 };
                double u = xSeina ? p.Z : p.X, t = xSeina ? p.X : p.Z;
                double sy = Math.Max(a.Syvyys, 1.0) + SeinaVaraM + 0.05;   // käytävä seinän molemmin puolin (raon yli)
                if (u > u0 && u < u1 && Math.Abs(t - taso) < sy) return true;
            }
            return false;
        }

        /// <summary>Vapaassa tilassa katsottu teos: enintään 9 m päässä, lähimpänä katseen suuntaa (kulma alle 25°).</summary>
        public Ripustus KatsottuTeos()
        {
            Ripustus paras = null; double pk = 25;
            var d = Nykyinen.Suunta;
            foreach (var r in sali.Ripustukset)
            {
                var v = r.Paikka.Keskipiste - Nykyinen.P; double l = v.Pituus;
                if (l > 9 || l < 0.3) continue;
                if (v.X * r.Paikka.Normaali.X + v.Z * r.Paikka.Normaali.Z > 0) continue;   // teoksen takaa
                double c = (v.X * d.X + v.Y * d.Y + v.Z * d.Z) / l;
                double k = Math.Acos(Math.Max(-1, Math.Min(1, c))) * 180 / Math.PI;
                if (k < pk) { pk = k; paras = r; }
            }
            return paras;
        }
    }
}
