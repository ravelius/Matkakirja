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
// Puhdas C#: MuseoTestit.
using System;
using System.Collections.Generic;
using Matkakirja.Linssit.Dioraama;
using Matkakirja.Linssit.Kamera;

namespace Matkakirja.Linssit.Museo
{
    public enum MuseoVaihe { Siirtyy, Pysahtyy, Vapaa, Valmis }

    public readonly struct Asento
    {
        public readonly V3 P, Katse;
        public Asento(V3 p, V3 katse) { P = p; Katse = katse; }
        public V3 Suunta { get { var d = Katse - P; double l = d.Pituus; return l < 1e-9 ? new V3(0, 0, -1) : d * (1 / l); } }
        public override string ToString() => $"{P} → {Katse}";
    }

    public sealed class MuseoKierros
    {
        public const double KavelyMs = 1.1, SiirtymaMinS = 2.5, PysahdysMinS = 6, SilmaY = 1.6, SeinaVaraM = 0.35, KatseEteenM = 3;
        public const double VapaaMs = 1.4, VapaaKaantoAs = 70, KallistusMax = 35;

        readonly Sali sali;
        /// <summary>Reittipisteiden indeksit, joissa on pysähdys (kohde + pysähdysaika).</summary>
        public readonly List<int> Pysahdykset = new List<int>();
        public MuseoVaihe Vaihe { get; private set; }
        public bool Tauolla { get; private set; }
        /// <summary>Pysähdys, jolle ollaan menossa tai jossa ollaan (indeksi Pysahdykset-listaan).</summary>
        public int Kohta { get; private set; }
        public Asento Nykyinen { get; private set; }
        public double VaiheenAika { get; private set; }
        public double VaiheenKesto { get; private set; }
        /// <summary>Kasvaa joka vaihteessa (UI päivittää otsikon).</summary>
        public int Versio { get; private set; }

        List<V3> polku = new List<V3>();
        List<double> polunMatka = new List<double>();
        Asento lahto;
        double yaw, pitch;

        public MuseoKierros(Sali s)
        {
            sali = s;
            for (int i = 0; i < s.Reitti.Count; i++)
                if (s.Reitti[i].Kohde != null && s.Reitti[i].PysahdysS > 0) Pysahdykset.Add(i);
            var alku = s.Reitti.Count > 0 ? s.Reitti[0] : new Reittipiste { P = new V3(0, SilmaY, 0), Katse = new V3(0, SilmaY, -5) };
            Nykyinen = new Asento(alku.P, alku.Katse);
            Kohta = 0;
            AloitaSiirtyma(0, 0);
        }

        public Reittipiste Pysahdys(int k) => k >= 0 && k < Pysahdykset.Count ? sali.Reitti[Pysahdykset[k]] : null;
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
            // Kulkupisteet edellisen ja seuraavan pysähdyksen välissä (taaksepäin hypättäessä samat käänteisesti).
            if (edellinen < loppu) for (int i = edellinen + 1; i < loppu; i++) polku.Add(sali.Reitti[i].P);
            else for (int i = edellinen - 1; i > loppu; i--) polku.Add(sali.Reitti[i].P);
            polku.Add(sali.Reitti[loppu].P);
            polku = Karsi(polku);
            polunMatka = Matkat(polku);
            lahto = Nykyinen;
            Vaihe = MuseoVaihe.Siirtyy;
            VaiheenAika = 0;
            VaiheenKesto = Math.Max(SiirtymaMinS, polunMatka[polunMatka.Count - 1] / KavelyMs + KaantoS(lahto, sali.Reitti[loppu]));
            Versio++;
        }

        static double KaantoS(Asento a, Reittipiste b)
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

        static List<double> Matkat(List<V3> p)
        {
            var m = new List<double> { 0 };
            // Kaaren pituus näytteistä (Catmull–Rom), 8 näytettä väliä kohden.
            for (int i = 0; i + 1 < p.Count; i++)
            {
                double s = 0; V3 ed = p[i];
                for (int k = 1; k <= 8; k++) { var q = Kaari(p, i, k / 8.0); s += (q - ed).Pituus; ed = q; }
                m.Add(m[i] + s);
            }
            return m;
        }

        /// <summary>Uniform Catmull–Rom välillä i → i+1 (päätepisteet toistettuina).</summary>
        static V3 Kaari(List<V3> p, int i, double t)
        {
            V3 p0 = p[Math.Max(0, i - 1)], p1 = p[i], p2 = p[Math.Min(p.Count - 1, i + 1)], p3 = p[Math.Min(p.Count - 1, i + 2)];
            double t2 = t * t, t3 = t2 * t;
            return 0.5 * ((2 * p1) + (p2 - p0) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t2 + (3 * p1 - p0 - 3 * p2 + p3) * t3);
        }

        /// <summary>Piste polulla matkan s kohdalla (ja suunta eteenpäin).</summary>
        V3 Polulla(double s)
        {
            double L = polunMatka[polunMatka.Count - 1];
            s = Math.Max(0, Math.Min(L, s));
            int i = 0;
            while (i + 2 < polunMatka.Count && polunMatka[i + 1] < s) i++;
            double seg = polunMatka[i + 1] - polunMatka[i];
            return Kaari(polku, i, seg < 1e-9 ? 1 : (s - polunMatka[i]) / seg);
        }

        public void Paivita(double dt)
        {
            if (Tauolla || Vaihe == MuseoVaihe.Vapaa || Vaihe == MuseoVaihe.Valmis) return;
            VaiheenAika += dt;
            if (Vaihe == MuseoVaihe.Siirtyy)
            {
                var kohde = sali.Reitti[Pysahdykset[Kohta]];
                double e = Kamerakayrat.Pehmea(Math.Min(1, VaiheenAika / VaiheenKesto));
                double L = polunMatka[polunMatka.Count - 1];
                var p = Polulla(e * L);
                // Katse: lähdön katse → kulkusuunta → kohteen katse (paino sin(πe) kulkusuunnalle, ei matkalla jos lyhyt).
                var eteen = Polulla(e * L + KatseEteenM);
                if ((eteen - p).Pituus < 0.2) eteen = kohde.Katse; else eteen = new V3(eteen.X, SilmaY, eteen.Z) + (eteen - p) * 2;
                var paat = V3.Lerp(lahto.Katse, kohde.Katse, e);
                double w = L > 3 ? Math.Sin(Math.PI * e) * 0.85 : 0;
                Nykyinen = new Asento(p, V3.Lerp(paat, eteen, w));
                if (VaiheenAika >= VaiheenKesto)
                {
                    Nykyinen = new Asento(kohde.P, kohde.Katse);
                    Vaihe = MuseoVaihe.Pysahtyy; VaiheenAika = 0; VaiheenKesto = Math.Max(PysahdysMinS, kohde.PysahdysS); Versio++;
                }
            }
            else if (Vaihe == MuseoVaihe.Pysahtyy && VaiheenAika >= VaiheenKesto) AloitaSiirtyma(Kohta + 1, Mista);
        }

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
            Nykyinen = new Asento(new V3(Nykyinen.P.X, SilmaY, Nykyinen.P.Z), Nykyinen.P + d);
            Vaihe = MuseoVaihe.Vapaa; Tauolla = false; VaiheenAika = 0; Versio++;
        }

        /// <summary>Vapaasta kierrokselle: kävellen lähimpään pysähdykseen (eteenpäin suosien nykyistä kohtaa).</summary>
        public void Kierrokselle()
        {
            if (Vaihe != MuseoVaihe.Vapaa) return;
            int paras = Kohta; double pm = double.MaxValue;
            for (int k = 0; k < Pysahdykset.Count; k++)
            {
                double d = (sali.Reitti[Pysahdykset[k]].P - Nykyinen.P).Pituus;
                if (d < pm) { pm = d; paras = k; }
            }
            Vaihe = MuseoVaihe.Siirtyy;
            AloitaSiirtyma(paras, Pysahdykset[paras]);
            // Polku suoraan nykyisestä paikasta (ei edellisen pysähdyksen kulkupisteitä).
            polku = Karsi(new List<V3> { Nykyinen.P, sali.Reitti[Pysahdykset[paras]].P });
            polunMatka = Matkat(polku);
            VaiheenKesto = Math.Max(SiirtymaMinS, polunMatka[1] / KavelyMs + KaantoS(Nykyinen, sali.Reitti[Pysahdykset[paras]]));
        }

        /// <summary>Vapaa liike: eteen (m/s-osuus −1…1), sivulle, käännös (aste-osuus), kallistus; dt sekunteina.
        /// Seinät rajaavat akseleittain (liukuu seinää pitkin), aukoista pääsee läpi.</summary>
        public void VapaaLiike(double eteen, double sivulle, double kaanto, double kallistus, double dt)
        {
            if (Vaihe != MuseoVaihe.Vapaa) return;
            yaw += kaanto * VapaaKaantoAs * dt;
            pitch = Math.Max(-KallistusMax, Math.Min(KallistusMax, pitch + kallistus * VapaaKaantoAs * dt));
            double yr = yaw * Math.PI / 180, pr = pitch * Math.PI / 180;
            var f = new V3(Math.Sin(yr), 0, -Math.Cos(yr)); var r = new V3(Math.Cos(yr), 0, Math.Sin(yr));
            var p = Nykyinen.P;
            var siirto = (f * eteen + r * sivulle) * (VapaaMs * dt);
            var px = new V3(p.X + siirto.X, p.Y, p.Z); if (Sallittu(px)) p = px;
            var pz = new V3(p.X, p.Y, p.Z + siirto.Z); if (Sallittu(pz)) p = pz;
            var suunta = new V3(Math.Sin(yr) * Math.Cos(pr), Math.Sin(pr), -Math.Cos(yr) * Math.Cos(pr));
            Nykyinen = new Asento(p, p + suunta);
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
