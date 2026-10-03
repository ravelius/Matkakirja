// PALLOVALITSIN (omistaja 3.10.2026, vain natiivi; Päätoimittaja hyväksyi toteutuksen): astronautin kameran kuvanäkymän pieni
// sijaintipallo on pyöritettävä kohdeselain. "Voisiko mini maapalloa pystyä pyörittämään? Se valitsisi silloin aina
// automaattisesti pienen viiveen jälkeen keskimmäisimmän kohteen."
// Puhdas logiikka (UI: Natiivi Sijaintipallo.cs): pallon katseen keskipiste (lat, lon; pohjoinen pysyy ylhäällä), sormen veto
// asteina, inertia (vauhti hidastuu eksponentiaalisesti), valintaviive (pallo pysähtynyt JA sormi irti, 0,5 s; uusi tartunta
// nollaa viiveen) ja keskimmäinen kohde (suurin pistetulo katseen kanssa, vain etupuolelta).
// Testit Linssit-testit/Testit/PallovalitsinTestit.cs.
using System;
using System.Collections.Generic;

namespace Matkakirja.Linssit.Astronautti
{
    public sealed class Pallovalitsin
    {
        /// <summary>Valinta, kun pallo on ollut levossa sormi irti näin kauan (s).</summary>
        public const double ValintaViiveS = 0.5;
        /// <summary>Inertian aikavakio (s): vauhti putoaa 1/e:hen tässä ajassa, eli pallo liukuu ~0,5–1 s.</summary>
        public const double HidastusS = 0.32;
        /// <summary>Tätä hitaampi pyöriminen (°/s) tulkitaan pysähdykseksi.</summary>
        public const double PysahdysRaja = 4;
        /// <summary>Vauhdin katto (°/s): nopea sipaisu ei linkoa palloa kymmeniä kierroksia.</summary>
        public const double MaxVauhti = 720;
        /// <summary>Katseen leveyden raja (°): napojen yli ei kierrytä (pohjoinen pysyy ylhäällä).</summary>
        public const double MaxLat = 80;
        /// <summary>Veto, jota seuraa näin pitkä paikallaan olo ennen irrotusta, ei jätä vauhtia (s).</summary>
        public const double VedonVanheneminenS = 0.1;

        public double Lat { get; private set; }
        public double Lon { get; private set; }
        public double VLat { get; private set; }
        public double VLon { get; private set; }
        public bool Kiinni { get; private set; }
        /// <summary>Pyöritys kesken (tartunnasta valintaan): valitsin odottaa valintaa.</summary>
        public bool Kaynnissa { get; private set; }

        double viimeVeto = double.NaN, edellinenAskel = double.NaN, lepoAlkoi = double.NaN;

        public double Vauhti => Math.Sqrt(VLat * VLat + VLon * VLon);
        public bool Pysahtynyt => !Kiinni && VLat == 0 && VLon == 0;

        /// <summary>Katse kohteeseen ilman liikettä (kuvanäkymän kohde vaihtui); keskeyttää pyörityksen.</summary>
        public void Aseta(double lat, double lon)
        {
            Lat = Math.Max(-MaxLat, Math.Min(MaxLat, lat));
            Lon = Normalisoi(lon);
            VLat = VLon = 0;
            Kiinni = Kaynnissa = false;
            lepoAlkoi = double.NaN;
        }

        /// <summary>Sormi palloon: liike pysähtyy ja valintaviive nollautuu.</summary>
        public void Tartu(double t)
        {
            Kiinni = Kaynnissa = true;
            VLat = VLon = 0;
            viimeVeto = edellinenAskel = t;
            lepoAlkoi = double.NaN;
        }

        /// <summary>
        /// Sormen siirto asteina (katseen keskipiste liikkuu, eli pinta liikkuu vastakkaiseen suuntaan). Vauhti on siirto /
        /// edellisestä vedosta kulunut aika, pehmennettynä; <paramref name="kestoS"/> antaa ajan suoraan (testikomento).
        /// </summary>
        public void Veto(double dLat, double dLon, double t, double kestoS = double.NaN)
        {
            if (!Kiinni) return;
            double dt = !double.IsNaN(kestoS) ? kestoS : double.IsNaN(viimeVeto) ? 0 : t - viimeVeto;
            if (dt > 1e-4)
            {
                double vl = dLat / dt, vo = dLon / dt;
                // Pehmennys: yksittäinen nykäys ei määrää vauhtia, mutta suunnanvaihto tuntuu heti.
                VLat = 0.4 * VLat + 0.6 * vl;
                VLon = 0.4 * VLon + 0.6 * vo;
                Rajoita();
            }
            Siirra(dLat, dLon);   // navan rajalla pystyvauhti nollautuu
            viimeVeto = edellinenAskel = t;
        }

        /// <summary>Sormi irti: pallo jatkaa vauhdilla (inertia), paitsi jos sormi pysähtyi ennen irrotusta tai liike on pois.</summary>
        public void Irti(double t, bool inertia = true, bool pidaVauhti = false)
        {
            if (!Kiinni) return;
            Kiinni = false;
            if (!inertia || (!pidaVauhti && !double.IsNaN(viimeVeto) && t - viimeVeto > VedonVanheneminenS)) VLat = VLon = 0;
            if (Vauhti < PysahdysRaja) { VLat = VLon = 0; lepoAlkoi = t; }
            edellinenAskel = t;
        }

        /// <summary>Inertian askel hetkeen t; true, jos katse liikkui.</summary>
        public bool Askel(double t)
        {
            double dt = double.IsNaN(edellinenAskel) ? 0 : t - edellinenAskel;
            edellinenAskel = t;
            if (Kiinni || dt <= 0 || (VLat == 0 && VLon == 0)) return false;
            dt = Math.Min(dt, 0.1);   // pitkä kehys (taustalla) ei hyppää
            Siirra(VLat * dt, VLon * dt);
            double f = Math.Exp(-dt / HidastusS);
            VLat *= f; VLon *= f;
            if (Vauhti < PysahdysRaja) { VLat = VLon = 0; lepoAlkoi = t; }
            return true;
        }

        /// <summary>Jäljellä oleva valintaviive (s); NaN, kun pallo liikkuu tai sormi on kiinni.</summary>
        public double Jaljella(double t) => !Kaynnissa || !Pysahtynyt || double.IsNaN(lepoAlkoi) ? double.NaN : Math.Max(0, ValintaViiveS - (t - lepoAlkoi));

        /// <summary>Valinnan hetki: pallo levossa ja sormi irti vähintään <see cref="ValintaViiveS"/>.</summary>
        public bool ValintaValmis(double t) => Kaynnissa && Pysahtynyt && !double.IsNaN(lepoAlkoi) && t - lepoAlkoi >= ValintaViiveS;

        /// <summary>Valinta tehty: pyöritys päättyy (katse jää paikalleen, kunnes kuvanäkymä asettaa uuden kohteen).</summary>
        public void Paata()
        {
            Kaynnissa = Kiinni = false;
            VLat = VLon = 0;
            lepoAlkoi = double.NaN;
        }

        void Siirra(double dLat, double dLon)
        {
            double lat = Lat + dLat;
            if (lat > MaxLat || lat < -MaxLat) { lat = Math.Max(-MaxLat, Math.Min(MaxLat, lat)); VLat = 0; }
            Lat = lat;
            Lon = Normalisoi(Lon + dLon);
        }

        void Rajoita()
        {
            double v = Vauhti;
            if (v > MaxVauhti) { VLat *= MaxVauhti / v; VLon *= MaxVauhti / v; }
        }

        static double Normalisoi(double lon)
        {
            lon %= 360;
            if (lon > 180) lon -= 360;
            if (lon <= -180) lon += 360;
            return lon;
        }

        /// <summary>
        /// Keskimmäinen kohde: kohteen suunnan pistetulo katseen keskipisteen kanssa suurin (= pienin kulma), vain pallon etupuolelta
        /// (pistetulo &gt; 0). Ohittaa kohteet ilman paikkaa tai kuvaa (kuten AstronauttiKierros). −1, jos mikään ei näy.
        /// </summary>
        public static int Keskimmainen(IReadOnlyList<Havaintokohde> kohteet, double lat, double lon)
        {
            const double R = Math.PI / 180;
            double cl = Math.Cos(lat * R), x = cl * Math.Cos(lon * R), y = Math.Sin(lat * R), z = cl * Math.Sin(lon * R);
            int paras = -1;
            double parasPiste = 0;
            for (int i = 0; i < (kohteet?.Count ?? 0); i++)
            {
                var k = kohteet[i];
                if (k == null || double.IsNaN(k.Lat) || double.IsNaN(k.Lon) || k.Havainnot.Count == 0) continue;
                double kc = Math.Cos(k.Lat * R);
                double p = x * kc * Math.Cos(k.Lon * R) + y * Math.Sin(k.Lat * R) + z * kc * Math.Sin(k.Lon * R);
                if (p > parasPiste) { parasPiste = p; paras = i; }
            }
            return paras;
        }
    }
}
