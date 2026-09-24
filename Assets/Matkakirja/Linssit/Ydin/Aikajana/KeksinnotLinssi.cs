// KEKSINTÖLINSSI (web js/linssit/keksinnot.js + js/aikajana.js pysäkkikello).
//
// Avaus: pelin kerrokset piiloon, musiikki pitoon, kamera ensimmäisen pysäkin
// lähikuvaan; esittelylaatikko (Natiivi-UI) käynnistää kellon (Kaynnista).
// Ilman UI:ta sovitin kutsuu Kaynnista-metodia itse.
//
// LUENNAT (KeksintoLuennat + ILuentaSoitin, web js/aikajana.js): esittelyn teksti
// soi laatikon auetessa ja katkeaa Käynnistä-napista; syttyvä pysäkki soittaa
// oman luentansa, merkkipaalun välinäytös syrjäyttää sen omalla puheellaan ja
// katkeaa Jatka-napista; selaus ja sulku hiljentävät. Soiva luenta pidättää
// pysäkin tauon loppua (Kello.PidataLuennalle).
using System;
using System.Collections.Generic;

namespace Matkakirja.Linssit.Aikajana
{
    public sealed class KeksinnotLinssi : ILinssi
    {
        readonly KeksinnotAineisto aineisto;
        readonly IPysakkiajonNakyma nakyma;
        readonly Func<bool> luentaSoi;
        readonly KeksintoLuennat luennat;
        readonly ILuentaSoitin soitin;
        ILinssiYmparisto y;
        Nakyma talteen;
        double edellinen;

        public Pysakkiajo Ajo { get; private set; }
        public LinssiTiedot Tiedot => aineisto.Tiedot;
        public bool Auki { get; private set; }

        public KeksinnotLinssi(KeksinnotAineisto aineisto, IPysakkiajonNakyma nakyma, Func<bool> luentaSoi = null,
            KeksintoLuennat luennat = null, ILuentaSoitin soitin = null)
        {
            this.aineisto = aineisto;
            this.luennat = luennat;
            this.soitin = soitin;
            this.nakyma = soitin == null ? nakyma : new LuennanValittaja(this, nakyma);
            this.luentaSoi = luentaSoi ?? (soitin == null ? null : () => soitin.Soi);
        }

        /// <summary>Viimeksi soitettu luenta (testit ja linssi-loki); null = hiljaa.</summary>
        public string Luenta { get; private set; }

        void Soita(string url)
        {
            if (soitin == null) return;
            Luenta = url;
            if (url == null) soitin.Lopeta();
            else soitin.Soita(url, KeksintoLuennat.ViiveMs);
        }

        void Hiljaa()
        {
            if (Luenta == null) return;
            Luenta = null;
            soitin?.Lopeta();
        }

        /// <summary>Kuuntelee pysäkkiajon näkymäkutsuja ja soittaa luennat; välittää kaiken eteenpäin.</summary>
        sealed class LuennanValittaja : IPysakkiajonNakyma
        {
            readonly KeksinnotLinssi l;
            readonly IPysakkiajonNakyma n;
            public LuennanValittaja(KeksinnotLinssi l, IPysakkiajonNakyma n) { this.l = l; this.n = n; }
            public void Kello(double vuosi) => n?.Kello(vuosi);
            public void Sytyta(int i)
            {
                n?.Sytyta(i);
                var p = l.aineisto.Pysakit[i];
                // Hiljainen pysäkki ei puhu. Välinäytöksen pysäkki soittaa ensin oman
                // luentansa; jos välinäytös aukeaa (ensimmäinen kerta), Valinaytos
                // vaihtaa sen samassa askeleessa ennen kuin viive ehtii kulua.
                if (!p.Hiljainen) l.Soita(l.luennat?.Pysakille(p));
            }
            public void Selaus(int i) { l.Hiljaa(); n?.Selaus(i); }
            public void Valinaytos(int i)
            {
                l.Soita(l.luennat?.Valinaytos);
                n?.Valinaytos(i);
            }
            public void Tauolla(bool tauolla) => n?.Tauolla(tauolla);
            public void Loppu() => n?.Loppu();
        }

        public void Avaa(ILinssiYmparisto ymparisto)
        {
            if (Auki) return;
            y = ymparisto;
            Auki = true;
            talteen = y.Kamera;
            edellinen = y.Aika;
            y.Pelikerrokset(false);
            y.MusiikkiPitoon(true);
            Ajo = new Pysakkiajo(aineisto.Pysakit, aineisto.Alku, aineisto.Alue, y, nakyma, luentaSoi) { AlueLaudalla = aineisto.AlueLaudalla };
            // Pimeässä ajettu avauskamera (web AVAUS_KAMERA_MS 700).
            Ajo.SovitaAlkuun(700);
            // Web avaa: pysäkkiajolla musiikki alkaa heti esittelyn alla puolella tasolla
            // (aloitaMusiikki(false)); Käynnistä nostaa täyteen (Pysakkiajo.Jatka).
            Ajo.MusiikkiLaji = aineisto.Musiikki;
            if (Ajo.MusiikkiLaji != null)
            {
                y.LinssiMusiikki(Ajo.MusiikkiLaji);
                y.LinssiMusiikkiHimmennys(Pysakkiajo.TaukoHimmennys);
            }
            // Kertoja lukee esittelyn laatikon auetessa (web avaa → ESITTELYN_RUNKO).
            if (luennat?.Esittely != null) Soita(luennat.Esittely);
        }

        /// <summary>
        /// Kaari käynnistyi (Käynnistä-nappi, testikomento tai muu reitti): esittelylaatikko
        /// väistyy. UI kuuntelee tätä eikä pelkkää omaa nappiaan (Laitetestaajan havainto 23.9.).
        /// </summary>
        public event Action Kaynnistetty;
        public bool OnKaynnistetty { get; private set; }

        /// <summary>Esittelylaatikon Käynnistä-nappi: esittelyn luenta katkeaa, kello lähtee.</summary>
        public void Kaynnista()
        {
            if (Ajo == null) return;
            Hiljaa();
            Ajo.Jatka();
            if (!OnKaynnistetty) { OnKaynnistetty = true; Kaynnistetty?.Invoke(); }
        }

        // ── Tiedeliite (web aikajana.js avaaJuttu, vaimennaJutunAjaksi, palautaJutunJalkeen) ──

        /// <summary>Tiedeliitteen sivu pyydettiin auki (kortin "Lue juttu" tai napautus): UI avaa sivun.</summary>
        public event Action<int> JuttuPyydetty;
        /// <summary>Auki oleva sivu (pysäkin indeksi) tai -1.</summary>
        public int JuttuAuki { get; private set; } = -1;

        /// <summary>Pysäkkien määrä (sivut indeksoidaan 0…Pysakkeja-1).</summary>
        public int Pysakkeja => aineisto.Pysakit.Count;

        /// <summary>Hampurilaisen sisällys: sivulliset pysäkit (indeksi, vuosi/ajoitus, otsikko, henkilö).</summary>
        public IReadOnlyList<(int I, string Vuosi, string Otsikko, string Henkilo)> Sisallys() => Aikajana.Tiedeliite.Sisallys(aineisto.Pysakit);

        /// <summary>Sivun sisältö UI:lle (null, jos pysäkillä ei ole sivua).</summary>
        public TiedeliiteSivu Tiedeliite(int i) => Aikajana.Tiedeliite.Sivu(aineisto.Pysakit, i);

        /// <summary>
        /// Avaa tiedeliitteen pysäkille i. TIEDELIITE ON OMA NÄKYMÄNSÄ: linssin raita väistyy kokonaan
        /// sivun ajaksi ja palaa sulkiessa; kello ei liiku. Palauttaa false, jos sivua ei ole.
        /// </summary>
        public bool AvaaJuttu(int i)
        {
            if (!Auki || !Aikajana.Tiedeliite.OnSivu(i >= 0 && i < aineisto.Pysakit.Count ? aineisto.Pysakit[i] : null)) return false;
            if (JuttuAuki < 0 && Ajo?.MusiikkiLaji != null) y.LinssiMusiikki(null);
            JuttuAuki = i;
            JuttuPyydetty?.Invoke(i);
            return true;
        }

        /// <summary>Sivua selattiin toiseen keksijään (web kunVaihtuu): linssin paneeli seuraa, kello ei liiku.</summary>
        public void JuttuVaihtui(int j)
        {
            if (JuttuAuki < 0) return;
            JuttuAuki = j;
        }

        /// <summary>Sivu suljettiin (web palautaJutunJalkeen): raita palaa ajon tasolle.</summary>
        public void JuttuSuljettu()
        {
            if (JuttuAuki < 0) return;
            JuttuAuki = -1;
            if (!Auki || Ajo?.MusiikkiLaji == null) return;
            y.LinssiMusiikki(Ajo.MusiikkiLaji);
            y.LinssiMusiikkiHimmennys(Ajo.Kaynnissa ? 1 : Pysakkiajo.TaukoHimmennys);
        }

        /// <summary>Välinäytöksen Jatka-nappi: välinäytöksen puhe katkeaa (web suljeValinaytos).</summary>
        public void JatkaValinaytoksesta()
        {
            if (Ajo == null) return;
            if (Ajo.ValinaytosAuki) Hiljaa();
            Ajo.Jatka();
        }

        public void Paivita()
        {
            if (!Auki) return;
            double nyt = y.Aika;
            Ajo.Paivita((nyt - edellinen) * 1000);
            edellinen = nyt;
        }

        public void Sulje()
        {
            if (!Auki) return;
            Auki = false;
            Ajo.Tauko();
            Hiljaa();
            if (Ajo.MusiikkiLaji != null) y.LinssiMusiikki(null);
            y.Pelikerrokset(true);
            y.MusiikkiPitoon(false);
            y.AjaKamera(talteen, y.VahennettyLiike ? 0f : 0.9f);
            Ajo = null;
        }
    }
}
