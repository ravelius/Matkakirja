// OFFLINE-LATAUKSEN TILA (Natiivi-UI): ratas-paneelin offline-osion (Aanentasot)
// lisäksi pelaaja näkee latauksen kulun ja verkon tilan kartalla.
//
//   Pilleri     yläpalkin alla vasemmalla, vain kun on kerrottavaa:
//                 Ladataan Ranska · 42 %         (yksi maa)
//                 Ladataan 3 maata · 42 %        (usea; osuus kaikista tavuista)
//                 Ei verkkoa · 2 maata laitteella (Application.internetReachability)
//               ohut edistymispalkki alareunassa; napautus avaa ratas-paneelin.
//   Ilmoitus    kun maa valmistuu tai lataus epäonnistuu (Ylapalkki.Viesti).
//
// Tila luetaan UiPalvelut.Offline-palvelusta (Natiivisepän OfflineSilta → Alueet);
// asettamaton palvelu = vain verkon tila.
using System;
using System.Collections.Generic;
using System.Linq;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class OfflineTilaUi
    {
        readonly UiKerros kerros;
        readonly Ylapalkki ylapalkki;
        readonly Button pilleri;
        readonly Label teksti;
        readonly VisualElement palkki, taytto;
        readonly Dictionary<string, OfflineTila> edelliset = new Dictionary<string, OfflineTila>();
        IOfflineLataus kuunneltu;
        bool paivitysPyydetty, sallittu = true;
        bool? testiVerkoton;

        public OfflineTilaUi(UiKerros kerros, Ylapalkki ylapalkki, Action avaaAsetukset)
        {
            this.kerros = kerros;
            this.ylapalkki = ylapalkki;
            var turva = kerros.Turva(UiKerros.Tilarivi);
            pilleri = Rakenne.Nappi(null, "mk-offlineTila", () => avaaAsetukset?.Invoke(), turva);
            pilleri.style.display = DisplayStyle.None;
            teksti = Rakenne.Teksti("", "mk-offlineTila__teksti", pilleri);
            Kirjasimet.Aseta(teksti, Kirjasin.Kone);
            palkki = Rakenne.El("mk-offlineTila__palkki", pilleri, PickingMode.Ignore);
            taytto = Rakenne.El("mk-offlineTila__taytto", palkki, PickingMode.Ignore);
            kerros.TurvaMuuttui += Asettele;
            Asettele();
            // Palvelu syntyy kohtauksen latauduttua; verkon tila ei anna tapahtumaa.
            pilleri.schedule.Execute(Paivita).Every(2000);
        }

        void Asettele() => pilleri.style.top = Ylapalkki.Varaus + 8;

        /// <summary>Linssi tai muu koko ruudun näkymä: pilleri piiloon (ilmoitukset silti).</summary>
        public void NaytaSallittu(bool sallitaan)
        {
            sallittu = sallitaan;
            Paivita();
        }

        void PalveluMuuttui()
        {
            // Palvelu voi kutsua taustasäikeestä: päivitys pääsäikeessä, kerran ruudussa.
            if (paivitysPyydetty) return;
            paivitysPyydetty = true;
            UiKerros.PaaSaikeessa(() => { paivitysPyydetty = false; Paivita(); });
        }

        void Paivita()
        {
            var p = UiPalvelut.Offline;
            if (!ReferenceEquals(p, kuunneltu))
            {
                if (kuunneltu != null) kuunneltu.Muuttui -= PalveluMuuttui;
                kuunneltu = p;
                if (p != null) p.Muuttui += PalveluMuuttui;
                edelliset.Clear();
                if (p != null) foreach (var m in p.Maat) edelliset[m.Id] = m.Tila;
            }
            var maat = p?.Maat ?? (IReadOnlyList<OfflineMaa>)Array.Empty<OfflineMaa>();
            Ilmoita(maat);

            var kaynnissa = maat.Where(m => m.Tila == OfflineTila.Latautuu || m.Tila == OfflineTila.Jonossa).ToList();
            bool verkoton = testiVerkoton ?? Application.internetReachability == NetworkReachability.NotReachable;
            string rivi = null;
            float osuus = -1f;
            if (kaynnissa.Count > 0)
            {
                long tavut = kaynnissa.Sum(m => Math.Max(0, m.Tavut)), ladattu = kaynnissa.Sum(m => Math.Max(0, m.Ladattu));
                osuus = tavut > 0 ? Mathf.Clamp01((float)ladattu / tavut) : 0f;
                string mita = kaynnissa.Count == 1 ? kaynnissa[0].Nimi : kaynnissa.Count + " maata";
                rivi = (verkoton ? "Odottaa verkkoa · " : "Ladataan ") + mita + " · " + Mathf.RoundToInt(osuus * 100) + " %";
            }
            else if (verkoton)
            {
                int n = maat.Count(m => m.Tila == OfflineTila.Valmis);
                rivi = "Ei verkkoa · " + (n == 0 ? "ei ladattuja maita" : n == 1 ? maat.First(m => m.Tila == OfflineTila.Valmis).Nimi + " laitteella" : n + " maata laitteella");
            }
            bool nakyy = rivi != null && sallittu;
            pilleri.style.display = nakyy ? DisplayStyle.Flex : DisplayStyle.None;
            if (!nakyy) return;
            teksti.text = rivi;
            pilleri.EnableInClassList("mk-verkoton", verkoton);
            palkki.style.display = osuus >= 0f ? DisplayStyle.Flex : DisplayStyle.None;
            taytto.style.width = Length.Percent(Mathf.Max(0f, osuus) * 100f);
        }

        /// <summary>Valmistuminen ja virhe ilmoituksena (vain siirtymä, ei alkutila).</summary>
        void Ilmoita(IReadOnlyList<OfflineMaa> maat)
        {
            foreach (var m in maat)
            {
                edelliset.TryGetValue(m.Id, out var ennen);
                if (ennen == m.Tila) continue;
                edelliset[m.Id] = m.Tila;
                bool oliKaynnissa = ennen == OfflineTila.Latautuu || ennen == OfflineTila.Jonossa;
                if (!oliKaynnissa) continue;
                if (m.Tila == OfflineTila.Valmis)
                    ylapalkki.Viesti(m.Nimi + " ladattu: kartta ja lehdet toimivat ilman verkkoa.", 4f);
                else if (m.Tila == OfflineTila.Virhe)
                    ylapalkki.Viesti(m.Nimi + ": lataus ei onnistunut" + (string.IsNullOrEmpty(m.Virhe) ? "." : " (" + m.Virhe + ")."), 5f);
            }
        }

        /// <summary>
        /// Testikomento "ui offline demo": keksitty palvelu (Ranska ~6 s, Italia jonossa ja
        /// virhe lopuksi), jotta pilleri, ilmoitukset ja ratas-osio näkyvät ilman latausta.
        /// Oikea palvelu palautetaan Lopeta-kutsussa.
        /// </summary>
        public sealed class TestiLataus : IOfflineLataus
        {
            static IOfflineLataus talteen;
            static TestiLataus nykyinen;
            readonly List<OfflineMaa> maat = new List<OfflineMaa>
            {
                new OfflineMaa { Id = "FRA", Nimi = "Ranska", Tavut = 412L << 20, Tila = OfflineTila.Latautuu, Manner = "europe" },
                new OfflineMaa { Id = "ITA", Nimi = "Italia", Tavut = 356L << 20, Tila = OfflineTila.Jonossa, Manner = "europe" },
                new OfflineMaa { Id = "DEU", Nimi = "Saksa", Tavut = 388L << 20, Tila = OfflineTila.Valmis, Ladattu = 388L << 20, Manner = "europe" },
                // Maanosarivit (omistaja 24.9.): Aasia ladattu, Afrikka ei, Eurooppa latautuu.
                new OfflineMaa { Id = "JPN", Nimi = "Japani", Tavut = 290L << 20, Tila = OfflineTila.Valmis, Ladattu = 290L << 20, Manner = "asia" },
                new OfflineMaa { Id = "EGY", Nimi = "Egypti", Tavut = 240L << 20, Tila = OfflineTila.Ei, Manner = "africa" },
            };
            IVisualElementScheduledItem ajo;

            public static void Kaynnista()
            {
                if (nykyinen != null) return;
                talteen = UiPalvelut.Offline;
                nykyinen = new TestiLataus();
                UiPalvelut.Offline = nykyinen;
                nykyinen.ajo = UiKerros.Hae().Juuri(UiKerros.Tilarivi).schedule.Execute(nykyinen.Askel).Every(250);
            }

            public static void Lopeta()
            {
                if (nykyinen == null) return;
                nykyinen.ajo?.Pause();
                UiPalvelut.Offline = talteen;
                nykyinen = null;
            }

            void Askel()
            {
                var a = maat.FirstOrDefault(m => m.Tila == OfflineTila.Latautuu);
                if (a == null) { ajo?.Pause(); return; }
                a.Ladattu = Math.Min(a.Tavut, a.Ladattu + a.Tavut / 24);
                if (a.Ladattu >= a.Tavut)
                {
                    // Ranska valmistuu, Italia epäonnistuu puolivälissä (virheilmoitus).
                    a.Tila = OfflineTila.Valmis;
                    var seuraava = maat.FirstOrDefault(m => m.Tila == OfflineTila.Jonossa);
                    if (seuraava != null) seuraava.Tila = OfflineTila.Latautuu;
                }
                else if (a.Id == "ITA" && a.Ladattu > a.Tavut / 2)
                {
                    a.Tila = OfflineTila.Virhe;
                    a.Virhe = "yhteys katkesi";
                }
                Muuttui?.Invoke();
            }

            public IReadOnlyList<OfflineMaa> Maat => maat;
            public event Action Muuttui;
            public void Lataa(string id) { var m = maat.First(x => x.Id == id); m.Tila = OfflineTila.Latautuu; m.Ladattu = 0; m.Virhe = null; ajo?.Resume(); Muuttui?.Invoke(); }
            public void Peru(string id) { var m = maat.First(x => x.Id == id); m.Tila = OfflineTila.Ei; m.Ladattu = 0; Muuttui?.Invoke(); }
            public void Poista(string id) { var m = maat.First(x => x.Id == id); m.Tila = OfflineTila.Ei; m.Ladattu = 0; Muuttui?.Invoke(); }
            public long VapaaTila => 48L << 30;
        }

        /// <summary>Testikomento: verkon tila pakotetuksi (true/false) tai takaisin laitteen tilaan (null).</summary>
        public void TestaaVerkoton(bool? verkoton)
        {
            testiVerkoton = verkoton;
            Paivita();
        }
    }
}
