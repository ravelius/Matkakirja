// PYSÄKKIAJO (web js/aikajana.js ilman kertomusta: keksintölinssi).
//
// Kello juoksee vuosi vuodelta ja pysähtyy jokaiselle pysäkille (4,6 s,
// merkkipaalu 3,2 s); valo syttyy, paneeli vaihtuu ja kamera on jo perillä:
// ajo alkaa 3,68 s ennen syttymistä ja päättyy 0,3 s ennen, jotta uusi valo
// syttyy paikallaan olevalle kartalle. Selostus pidättää tauon loppua. Lopussa
// kamera perääntyy koko kaaren näkymään ja kaikki valot jäävät palamaan.
//
// Merkkipaalu, jolla on välinäytös, pysäyttää kellon, kunnes pelaaja jatkaa.
using System;
using System.Collections.Generic;

namespace Matkakirja.Linssit.Aikajana
{
    /// <summary>Pysäkki kartalla (web tapahtuma): paikka vuosina, sijainti ja tauon laji.</summary>
    public sealed class Pysakki
    {
        public double Vuosi;
        public double Lat, Lon;
        public bool Paalu, Hiljainen, Valinaytos;
        public string Otsikko, Paikka, Henkilo;
        /// <summary>Tiedeliitteen sisältö (web keksinnot.js): ingressi, juttu, henkilöjuttu, kuvat, lähde.</summary>
        public string Selite, Juttu, Henkilojuttu, Lahde, Ajoitus;
        public Kuvatieto Kuva, KuvaToinen, KuvaAito, Ilmio, IlmioLisa;
    }

    /// <summary>Pysäkkiajon näkyvät asiat (valot, paneeli, kello, välinäytös).</summary>
    public interface IPysakkiajonNakyma
    {
        void Kello(double vuosi);
        void Sytyta(int i);
        /// <summary>Selaus: kaikki valot palavat; ≥ i tulevia (web lampunTila selaus).</summary>
        void Selaus(int i);
        void Valinaytos(int i);
        void Tauolla(bool tauolla);
        void Loppu();
    }

    public sealed class Pysakkiajo
    {
        readonly IReadOnlyList<Pysakki> pysakit;
        readonly KellonPysakki[] kellon;
        readonly ILinssiYmparisto y;
        readonly IPysakkiajonNakyma nakyma;
        readonly double lahikuva;
        readonly Laatikko alue;
        readonly Func<bool> luentaSoi;
        KellonTila tila;
        int kameraKohde = -1;
        double luennanAlku;
        bool nahty;

        public bool Kaynnissa { get; private set; }
        public bool Paattynyt { get; private set; }
        public bool ValinaytosAuki { get; private set; }
        public KellonTila Tila => tila;
        public (LatLon keskus, double leveysAst, double kestoMs)? ViimeisinAjo { get; private set; }

        /// <param name="alue">Kaaren laatikko asteina (loppukuva).</param>
        /// <param name="luentaSoi">Soiko selostus nyt (pidättää tauon loppua).</param>
        public Pysakkiajo(IReadOnlyList<Pysakki> pysakit, double alku, Laatikko alue, ILinssiYmparisto ymparisto,
            IPysakkiajonNakyma nakyma, Func<bool> luentaSoi = null, double lahikuva = Kameramatikka.LahikuvaLeveys)
        {
            this.pysakit = pysakit;
            kellon = new KellonPysakki[pysakit.Count];
            for (int i = 0; i < pysakit.Count; i++) kellon[i] = new KellonPysakki(pysakit[i].Vuosi, pysakit[i].Paalu, pysakit[i].Hiljainen);
            this.alue = alue;
            y = ymparisto;
            this.nakyma = nakyma;
            this.luentaSoi = luentaSoi ?? (() => false);
            this.lahikuva = lahikuva;
            tila = KellonTila.Aluksi(alku);
        }

        KellonTahti Tahti => y.VahennettyLiike ? Kello.VahennettyTahti : KellonTahti.Oletus;

        /// <summary>Alkunäkymä: ensimmäisen pysäkin lähikuva (web sovitaAlkuun).</summary>
        public void SovitaAlkuun(double kestoMs = 0)
        {
            if (pysakit.Count == 0) return;
            AjaPysakille(0, kestoMs);
        }

        /// <summary>
        /// Linssin oma raita (web aikajana.js AIKAJANA_TAUKO_HIMMENNYS): tauolla ja kaaren lopussa
        /// musiikki jää soimaan puoleen tasoon, ei katkea.
        /// </summary>
        public const double TaukoHimmennys = 0.5;
        /// <summary>Kaaren musiikkilaji (web kaari.musiikki); null = hiljainen kaari, ei kosketa soittimeen.</summary>
        public string MusiikkiLaji;

        void Saada(double taso) { if (MusiikkiLaji != null) y.LinssiMusiikkiHimmennys(taso); }

        public void Jatka()
        {
            if (Paattynyt) return;
            if (ValinaytosAuki) ValinaytosAuki = false;
            Kaynnissa = true;
            nakyma.Tauolla(false);
            Saada(1);
        }

        public void Tauko()
        {
            if (!Kaynnissa) return;
            Kaynnissa = false;
            nakyma.Tauolla(true);
            Saada(TaukoHimmennys);
        }

        /// <summary>Kutsutaan joka kehys; dtMs rajataan 200 ms:iin (web kehys).</summary>
        public void Paivita(double dtMs)
        {
            if (!Kaynnissa || Paattynyt) return;
            double dt = Math.Min(Kello.DtKatto, Math.Max(0, dtMs));
            double nyt = y.Aika * 1000;
            tila = Kello.PidataLuennalle(tila, luentaSoi(), nyt - luennanAlku);
            var r = Kello.Askel(tila, dt, kellon, Tahti);
            tila = r.Tila;
            nakyma.Kello(tila.Paikka);
            if (r.Syttyi >= 0) Sytyta(r.Syttyi, nyt);
            else if (!luentaSoi()) KameraEnnakko();
            if (r.Loppu) Lopeta();
        }

        void Sytyta(int i, double nyt)
        {
            var p = pysakit[i];
            nakyma.Sytyta(i);
            if (p.Hiljainen) return;
            luennanAlku = nyt;
            if (kameraKohde != i) { kameraKohde = i; AjaPysakille(i, Kameramatikka.PohjaMs); }
            if (p.Valinaytos && !nahty)
            {
                nahty = true;
                ValinaytosAuki = true;
                Kaynnissa = false;
                nakyma.Valinaytos(i);
            }
        }

        /// <summary>Seuraava ei-hiljainen pysäkki indeksin jälkeen (web seuraavaNakyva).</summary>
        int SeuraavaNakyva(int i)
        {
            for (int k = i + 1; k < pysakit.Count; k++) if (!pysakit[k].Hiljainen) return k;
            return pysakit.Count;
        }

        void KameraEnnakko()
        {
            if (y.VahennettyLiike) return;
            int kohde = SeuraavaNakyva(tila.I);
            if (kameraKohde == kohde || kohde >= pysakit.Count) return;
            double eta = Kello.AikaSeuraavaan(tila, kellon, Tahti, Kameramatikka.EnnakkoMs + Kello.AliaskelMs);
            if (!double.IsFinite(eta)) return;
            kameraKohde = kohde;
            AjaPysakille(kohde, Kameramatikka.AjonKesto(eta));
        }

        void AjaPysakille(int i, double kestoMs)
        {
            var p = pysakit[i];
            // Merkkipaalulla (1873) ei ole paikkaa: kamera jää siihen, missä on.
            if (!double.IsFinite(p.Lat) || !double.IsFinite(p.Lon)) return;
            Aja(new LatLon(p.Lat, p.Lon), Kameramatikka.LeveysAsteina(lahikuva), kestoMs);
        }

        void Aja(LatLon keskus, double leveysAst, double kestoMs)
        {
            ViimeisinAjo = (keskus, leveysAst, kestoMs);
            double ms = y.VahennettyLiike ? 0 : kestoMs;
            y.AjaKamera(new Nakyma(keskus.Lat, keskus.Lon, y.KorkeusLeveydelle(leveysAst)), (float)(ms / 1000));
        }

        void Lopeta()
        {
            Paattynyt = true;
            Kaynnissa = false;
            kameraKohde = -1;
            // Koko kaari ruudulle (web sovitaKaareen, marginaali 0,03 kummallekin puolelle).
            var r = alue.Rajaus();
            double leveys = Math.Max(r.LeveysAst, r.KorkeusAst * y.Kuvasuhde) * 1.06;
            Aja(new LatLon(r.Lat, r.Lon), leveys, Kameramatikka.LoppuAjoMs);
            Saada(TaukoHimmennys);
            nakyma.Loppu();
        }

        /// <summary>Selaus pysäkkiin i (web siirry): kello seis, kaikki valot palavat, kamera perille.</summary>
        public void Siirry(int i)
        {
            if (i < 0 || i >= pysakit.Count) return;
            Tauko();
            Paattynyt = false;
            var p = kellon[i];
            tila = new KellonTila { Paikka = p.Paikka, I = i, Viive = 0, Alku = p.Paikka };
            nakyma.Kello(p.Paikka);
            nakyma.Selaus(i);
            kameraKohde = i;
            AjaPysakille(i, Kameramatikka.PohjaMs);
        }

        /// <summary>Alusta ilman avausjaksoa (web alusta).</summary>
        public void Alusta(double alku)
        {
            tila = KellonTila.Aluksi(alku);
            Paattynyt = false;
            kameraKohde = -1;
            nahty = false;
            nakyma.Selaus(-1);
            SovitaAlkuun(Kameramatikka.PohjaMs);
            Jatka();
        }
    }
}
