// KÄSITTELY KÄSIN, SYÖTEPUOLI (Natiivi-UI 8.10.2026; pelattavuusmalli kohta 6 "Käsittele käsin: ovi, arkun kilvet", Päätoimittaja
// 8.10.): esineestä alkava veto asteiksi ja kulmanopeudeksi (°/s). Hidas veto (alle HiljainenRajaAsteS) on hiljainen, nopea narahtaa
// (4 m, Siirtosepän puoli). Puhdas ydin: SeikkailuTapit syöttää kosketuksen pisteinä (Mac: hiiri on Siirtosepän ja voi syöttää samaan);
// esineen kierto, ääni ja kuulo kuuluvat esineluokalle. Suunta: x + oikealle, y + ylös (sormen suunta, ei käännetä kuten katsetta).
using System;

namespace Matkakirja.Linssit.Seikkailu
{
    public sealed class KasittelyVeto
    {
        /// <summary>Asteita vedon pisteeltä (sama kuin katseen veto vaakaan, pelattavuusmalli kohta 6).</summary>
        public const double AsteitaPerPt = 0.30;
        /// <summary>Hiljaisen vedon yläraja (°/s): pelattavuusmalli kohta 6 "hidas veto (alle 30°/s) on hiljainen".</summary>
        public const double HiljainenRajaAsteS = 30;
        /// <summary>Kulmanopeuden tasoituksen aikavakio (s): yksittäinen nykäys ei narahda, tasainen nopea veto narahtaa.</summary>
        public const double TasoitusS = 0.10;

        /// <summary>Veto käynnissä (Aloita → Lopeta).</summary>
        public bool Kaynnissa { get; private set; }
        /// <summary>Kertymä vedon alusta asteina.</summary>
        public double AsteetX { get; private set; }
        public double AsteetY { get; private set; }
        /// <summary>Tasoitettu kulmanopeus (°/s, suuruus); 0 vedon alussa ja lopussa.</summary>
        public double NopeusAsteS { get; private set; }
        /// <summary>Suurin tasoitettu kulmanopeus tämän vedon aikana (°/s).</summary>
        public double HuippuAsteS { get; private set; }
        /// <summary>Nopeus alle rajan (ei narahdusta).</summary>
        public bool Hiljainen => NopeusAsteS < HiljainenRajaAsteS;
        /// <summary>Kuinka monta kertaa nopeus on noussut rajan yli (kasvaa kerran per ylitys; lukija vertaa edelliseen).</summary>
        public int Narahdukset { get; private set; }

        double lukematonX, lukematonY, odottavaX, odottavaY;

        /// <summary>Uusi veto (sormi esineen päällä ja liikkunut napautusrajan yli).</summary>
        public void Aloita()
        {
            Kaynnissa = true;
            AsteetX = AsteetY = NopeusAsteS = HuippuAsteS = 0;
            lukematonX = lukematonY = odottavaX = odottavaY = 0;
        }

        /// <summary>
        /// Sormen liike pisteinä (x + oikealle, y + ylös) ja kulunut aika (s). dt ≤ 0 (sama kehys) kerätään ja lasketaan nopeuteen
        /// seuraavan positiivisen dt:n kanssa.
        /// </summary>
        public void Liiku(double dxPt, double dyPt, double dt)
        {
            if (!Kaynnissa) return;
            double ax = dxPt * AsteitaPerPt, ay = dyPt * AsteitaPerPt;
            AsteetX += ax; AsteetY += ay;
            lukematonX += ax; lukematonY += ay;
            odottavaX += ax; odottavaY += ay;
            if (dt <= 0) return;
            double v = Math.Sqrt(odottavaX * odottavaX + odottavaY * odottavaY) / dt;
            odottavaX = odottavaY = 0;
            bool oliHiljainen = Hiljainen;
            NopeusAsteS += (v - NopeusAsteS) * (1 - Math.Exp(-dt / TasoitusS));
            if (NopeusAsteS > HuippuAsteS) HuippuAsteS = NopeusAsteS;
            if (oliHiljainen && !Hiljainen) Narahdukset++;
        }

        /// <summary>Sormi pysyy paikallaan (ei liikettä tällä kehyksellä): nopeus laskee tasoituksella.</summary>
        public void Paikallaan(double dt) => Liiku(0, 0, dt);

        /// <summary>Veto päättyi (sormi irti tai peruttu); kertymä jää luettavaksi Ota()-kutsulla.</summary>
        public void Lopeta()
        {
            Kaynnissa = false;
            NopeusAsteS = 0;
            odottavaX = odottavaY = 0;
        }

        /// <summary>Asteet edellisestä lukukerrasta (x, y); lukeminen nollaa.</summary>
        public (double X, double Y) Ota()
        {
            var r = (lukematonX, lukematonY);
            lukematonX = lukematonY = 0;
            return r;
        }
    }
}
