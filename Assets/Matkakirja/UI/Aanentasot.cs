// RATAS-PANEELI (Natiivi-UI, erä 1): verkkopelin #kehittaja-valikko.
//
//   ÄÄNENTASOT
//   Äänitehosteet  ━━━━━━━━●  100 %
//   Pulun ääni     ━━━━━━━━●  100 %
//   Lukija         ━━━━━━━●─   90 %
//   Taustamusiikki ━━●──────   35 %
//   Taustaäänet    ━━━━━━━━●  100 %
//   LATAA OFFLINE-KÄYTTÖÖN            (UiPalvelut.Offline, Natiiviseppä)
//   Ranska      312 Mt     [ Lataa ]
//   Italia      ▓▓▓▓░░ 58 %  [ Peru ]
//   Espanja     ✓ ladattu  [ Poista ]
//   vapaata 23,4 Gt
//
// Liukusäätimet: kultainen (--kulta #eab84e) täyttö ja nuppi, arvo kultaisena
// tasalevein numeroin. Kehittäjän kytkimet (maailma, mittari) ja työhuone
// jäävät verkkopeliin.
using System;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class Aanentasot : Pudotus
    {
        readonly Dictionary<Voima, (Slider Saadin, Label Arvo)> saatimet = new Dictionary<Voima, (Slider, Label)>();
        readonly VisualElement offlineOsio, offlineLista;
        readonly Label vapaaTila;
        readonly Dictionary<string, OfflineRivi> offlineRivit = new Dictionary<string, OfflineRivi>();
        IOfflineLataus kuunneltu;
        volatile bool offlinePyydetty;

        sealed class OfflineRivi
        {
            public VisualElement Juuri, Palkki, Taytto;
            public Label Nimi, Tieto;
            public Button Nappi;
        }

        public Aanentasot(UiKerros kerros, Func<float> alareuna) : base(kerros, alareuna, "mk-aanentasot")
        {
            Otsikko("Äänentasot");
            foreach (var v in Asetukset.VoimaJarjestys) Saadinrivi(v);

            offlineOsio = Rakenne.El("mk-offline", Sisalto, PickingMode.Ignore);
            Rakenne.Teksti("LATAA OFFLINE-KÄYTTÖÖN", "mk-pudotus__otsikko", offlineOsio);
            Rakenne.Teksti("Kartat ja lehdet tulevat verkosta. Ladatut maat toimivat ilman yhteyttä.", "mk-offline__selite", offlineOsio);
            AukiMuuttui += auki => { if (!auki) Asetukset.Tallenna(); };
            offlineLista = Rakenne.El("mk-offline__lista", offlineOsio, PickingMode.Ignore);
            vapaaTila = Rakenne.Teksti("", "mk-offline__vapaa", offlineOsio);
            // Omat liukusäätimet päivittävät arvonsa itse; muut muutokset (Uusi peli nollaa) päivittävät kaiken.
            Asetukset.Muuttui += nimi => { if (Auki && !Asetukset.OnTaso(nimi)) Paivita(); };
        }

        void Saadinrivi(Voima v)
        {
            var rivi = Rakenne.El("mk-saadinrivi", Sisalto);
            Rakenne.Teksti(Asetukset.Nimi(v), "mk-saadinrivi__nimi", rivi);
            var s = new Slider(0, 100) { pageSize = 0, fill = true };
            s.AddToClassList("mk-saadin");
            rivi.Add(s);
            var arvo = Rakenne.Teksti("", "mk-saadinrivi__arvo", rivi);
            s.RegisterValueChangedCallback(e =>
            {
                int p = Mathf.RoundToInt(e.newValue);
                arvo.text = p + " %";
                Asetukset.AsetaTaso(v, p / 100f, tallenna: false);
            });
            s.RegisterCallback<PointerCaptureOutEvent>(_ => Asetukset.Tallenna());
            saatimet[v] = (s, arvo);
        }

        protected override void Paivita()
        {
            foreach (var pari in saatimet)
            {
                int p = Mathf.RoundToInt(Asetukset.Taso(pari.Key) * 100f);
                pari.Value.Saadin.SetValueWithoutNotify(p);
                pari.Value.Arvo.text = p + " %";
            }
            PaivitaOffline();
        }

        // --- offline-lataus ----------------------------------------------------

        void PaivitaOffline()
        {
            var palvelu = UiPalvelut.Offline;
            if (!ReferenceEquals(palvelu, kuunneltu))
            {
                if (kuunneltu != null) kuunneltu.Muuttui -= OfflineMuuttui;
                kuunneltu = palvelu;
                if (palvelu != null) palvelu.Muuttui += OfflineMuuttui;
            }
            offlineOsio.style.display = palvelu != null ? DisplayStyle.Flex : DisplayStyle.None;
            if (palvelu == null) return;

            var nahty = new HashSet<string>();
            foreach (var maa in palvelu.Maat)
            {
                nahty.Add(maa.Id);
                if (!offlineRivit.TryGetValue(maa.Id, out var r)) offlineRivit[maa.Id] = r = UusiOfflineRivi(maa.Id);
                PaivitaRivi(r, maa);
            }
            foreach (var id in new List<string>(offlineRivit.Keys))
                if (!nahty.Contains(id)) { offlineRivit[id].Juuri.RemoveFromHierarchy(); offlineRivit.Remove(id); }
            long vapaa = palvelu.VapaaTila;
            vapaaTila.text = vapaa >= 0 ? "vapaata " + Koko(vapaa) : "";
        }

        void OfflineMuuttui()
        {
            // Palvelu voi kutsua taustasäikeestä: päivitys aina pääsäikeessä, enintään kerran ruudussa.
            if (offlinePyydetty) return;
            offlinePyydetty = true;
            UiKerros.PaaSaikeessa(() => { offlinePyydetty = false; if (Auki) PaivitaOffline(); });
        }

        OfflineRivi UusiOfflineRivi(string id)
        {
            var r = new OfflineRivi();
            r.Juuri = Rakenne.El("mk-offline-rivi", offlineLista, PickingMode.Ignore);
            var tiedot = Rakenne.El("mk-offline-rivi__tiedot", r.Juuri, PickingMode.Ignore);
            r.Nimi = Rakenne.Teksti("", "mk-offline-rivi__nimi", tiedot);
            r.Tieto = Rakenne.Teksti("", "mk-offline-rivi__tieto", tiedot);
            r.Palkki = Rakenne.El("mk-edistyminen", tiedot, PickingMode.Ignore);
            r.Taytto = Rakenne.El("mk-edistyminen__taytto", r.Palkki, PickingMode.Ignore);
            r.Nappi = Rakenne.Nappi("", "mk-pikkunappi", () => OfflineToiminto(id), r.Juuri);
            return r;
        }

        void PaivitaRivi(OfflineRivi r, OfflineMaa m)
        {
            r.Nimi.text = m.Nimi;
            bool latautuu = m.Tila == OfflineTila.Latautuu || m.Tila == OfflineTila.Jonossa;
            r.Palkki.style.display = latautuu ? DisplayStyle.Flex : DisplayStyle.None;
            float osuus = m.Tavut > 0 ? Mathf.Clamp01((float)m.Ladattu / m.Tavut) : 0f;
            r.Taytto.style.width = Length.Percent(osuus * 100f);
            r.Juuri.EnableInClassList("mk-valittu", m.Tila == OfflineTila.Valmis);
            r.Juuri.EnableInClassList("mk-virhe", m.Tila == OfflineTila.Virhe);
            string teksti, nappi;
            switch (m.Tila)
            {
                case OfflineTila.Jonossa: teksti = "jonossa · " + Koko(m.Tavut); nappi = "Peru"; break;
                case OfflineTila.Latautuu: teksti = Mathf.RoundToInt(osuus * 100) + " % · " + Koko(m.Ladattu) + " / " + Koko(m.Tavut); nappi = "Peru"; break;
                case OfflineTila.Valmis: teksti = "ladattu · " + Koko(m.Tavut); nappi = "Poista"; break;
                case OfflineTila.Virhe: teksti = "ei onnistunut" + (string.IsNullOrEmpty(m.Virhe) ? "" : ": " + m.Virhe); nappi = "Yritä uudelleen"; break;
                default: teksti = Koko(m.Tavut); nappi = "Lataa"; break;
            }
            r.Tieto.text = teksti;
            ((Label)r.Nappi.Q<Label>(className: "mk-nappi__teksti")).text = nappi;
        }

        void OfflineToiminto(string id)
        {
            var palvelu = UiPalvelut.Offline;
            if (palvelu == null) return;
            OfflineMaa maa = null;
            foreach (var m in palvelu.Maat) if (m.Id == id) { maa = m; break; }
            if (maa == null) return;
            switch (maa.Tila)
            {
                case OfflineTila.Jonossa:
                case OfflineTila.Latautuu: palvelu.Peru(id); break;
                case OfflineTila.Valmis: palvelu.Poista(id); break;
                default: palvelu.Lataa(id); break;
            }
            PaivitaOffline();
        }

        /// <summary>Tavut suomalaisittain: "312 Mt", "1,4 Gt".</summary>
        public static string Koko(long tavut)
        {
            if (tavut < 0) return "?";
            double mt = tavut / (1024.0 * 1024.0);
            if (mt < 1) return "< 1 Mt";
            if (mt < 1000) return Mathf.RoundToInt((float)mt) + " Mt";
            return (mt / 1024.0).ToString("0.0", System.Globalization.CultureInfo.InvariantCulture).Replace('.', ',') + " Gt";
        }
    }
}
