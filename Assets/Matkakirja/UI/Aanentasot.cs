// RATAS-PANEELI (Natiivi-UI, erä 1): verkkopelin #kehittaja-valikko.
//
//   ÄÄNENTASOT
//   Äänitehosteet  ━━━━━━━━●  100 %
//   Pulun ääni     ━━━━━━━━●  100 %
//   Lukija         ━━━━━━━●─   90 %
//   Taustamusiikki ━━●──────   35 %
//   Taustaäänet    ━━━━━━━━●  100 %
//   LATAA OFFLINE-KÄYTTÖÖN            (UiPalvelut.Offline, Natiiviseppä)
//   Kaikki      osittain · 1,2 / 9,8 Gt  [ Lataa ]
//   Eurooppa    ✓ ladattu · 1,2 Gt       [ Poista ]
//   Aasia       ▓▓▓▓░░ 58 %              [ Peru ]
//   Afrikka     2,1 Gt                   [ Lataa ]
//   vapaata 23,4 Gt
// Omistajan päätös 24.9.2026: vain "Kaikki" ylimpänä ja maanosat, ei yksittäisiä maita. Rivin tila
// kootaan maanosan maista (kaikki valmiina = ladattu, osa = osittain, ei yhtään = ei); toiminto
// kohdistuu maanosan maihin (Lataa puuttuvat, Peru latautuvat, Poista ladatut).
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
        readonly Label offlineTyhja;
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
            Rakenne.Teksti("Kartat ja lehdet tulevat verkosta. Ladatut maanosat toimivat ilman yhteyttä.", "mk-offline__selite", offlineOsio);
            AukiMuuttui += auki => { if (!auki) Asetukset.Tallenna(); };
            offlineLista = Rakenne.El("mk-offline__lista", offlineOsio, PickingMode.Ignore);
            offlineTyhja = Rakenne.Teksti("Ladattavia maita ei ole vielä saatavilla. Kartat ja lehdet tulevat verkosta.", "mk-offline__selite", offlineOsio);
            offlineTyhja.style.display = DisplayStyle.None;
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
            var ryhmat = Ryhmat(palvelu.Maat);
            foreach (var (id, nimi, maat) in ryhmat)
            {
                nahty.Add(id);
                if (!offlineRivit.TryGetValue(id, out var r)) offlineRivit[id] = r = UusiOfflineRivi(id);
                r.Juuri.BringToFront();
                var (k, osittain) = Kooste(id, nimi, maat);
                PaivitaRivi(r, k, osittain);
            }
            foreach (var id in new List<string>(offlineRivit.Keys))
                if (!nahty.Contains(id)) { offlineRivit[id].Juuri.RemoveFromHierarchy(); offlineRivit.Remove(id); }
            // Paketissa ei vielä offline-luetteloa (tuotannon v3): selitys tyhjän listan tilalle.
            offlineTyhja.style.display = nahty.Count == 0 ? DisplayStyle.Flex : DisplayStyle.None;
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

        void PaivitaRivi(OfflineRivi r, OfflineMaa m, bool osittain)
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
                case OfflineTila.Virhe: teksti = (osittain ? "osittain · " : "") + "ei onnistunut" + (string.IsNullOrEmpty(m.Virhe) ? "" : ": " + m.Virhe); nappi = "Yritä uudelleen"; break;
                default:
                    teksti = osittain ? "osittain · " + Koko(m.Ladattu) + " / " + Koko(m.Tavut) : "ei ladattu · " + Koko(m.Tavut);
                    nappi = "Lataa"; break;
            }
            r.Tieto.text = teksti;
            ((Label)r.Nappi.Q<Label>(className: "mk-nappi__teksti")).text = nappi;
        }

        // --- maanosat --------------------------------------------------------------

        static readonly (string Id, string Nimi)[] Maanosat =
        {
            ("europe", "Eurooppa"), ("middleeast", "Lähi-itä"), ("africa", "Afrikka"), ("asia", "Aasia"),
            ("northamerica", "Pohjois-Amerikka"), ("southamerica", "Etelä-Amerikka"), ("oceania", "Oseania"),
        };
        const string Kaikki = "kaikki";

        /// <summary>Maan maanosa: palvelun antama, muuten yleisin maan kaupunkien manner.</summary>
        static string MaanManner(OfflineMaa m)
        {
            if (!string.IsNullOrEmpty(m.Manner)) return m.Manner;
            var laskut = new Dictionary<string, int>();
            foreach (var k in UiSisalto.Kaikki)
                if (k.Maa == m.Id && !string.IsNullOrEmpty(k.Manner))
                    laskut[k.Manner] = (laskut.TryGetValue(k.Manner, out var n) ? n : 0) + 1;
            string paras = null; int suurin = 0;
            foreach (var p in laskut) if (p.Value > suurin) { suurin = p.Value; paras = p.Key; }
            return paras;
        }

        /// <summary>"Kaikki" ylimpänä, sitten maanosat, joissa on ladattavaa (tuntematon manner vain Kaikissa).</summary>
        static List<(string Id, string Nimi, List<OfflineMaa> Maat)> Ryhmat(IReadOnlyList<OfflineMaa> maat)
        {
            var tulos = new List<(string, string, List<OfflineMaa>)>();
            if (maat == null || maat.Count == 0) return tulos;
            tulos.Add((Kaikki, "Kaikki", new List<OfflineMaa>(maat)));
            var jaot = new Dictionary<string, List<OfflineMaa>>();
            foreach (var m in maat)
            {
                var mn = MaanManner(m);
                if (mn == null) continue;
                if (!jaot.TryGetValue(mn, out var l)) jaot[mn] = l = new List<OfflineMaa>();
                l.Add(m);
            }
            foreach (var (id, nimi) in Maanosat)
                if (jaot.TryGetValue(id, out var l)) tulos.Add((id, nimi, l));
            return tulos;
        }

        /// <summary>Maanosan rivi kootaan sen maista (sama OfflineMaa-muoto kuin yksittäisellä maalla).</summary>
        static (OfflineMaa Rivi, bool Osittain) Kooste(string id, string nimi, List<OfflineMaa> maat)
        {
            var k = new OfflineMaa { Id = id, Nimi = nimi };
            int valmiit = 0, virheet = 0; bool latautuu = false, jonossa = false;
            foreach (var m in maat)
            {
                k.Tavut += Math.Max(0, m.Tavut);
                switch (m.Tila)
                {
                    case OfflineTila.Valmis: valmiit++; k.Ladattu += Math.Max(0, m.Tavut); break;
                    case OfflineTila.Latautuu: latautuu = true; k.Ladattu += Math.Max(0, m.Ladattu); break;
                    case OfflineTila.Jonossa: jonossa = true; break;
                    case OfflineTila.Virhe: virheet++; if (k.Virhe == null) k.Virhe = m.Nimi + ": " + m.Virhe; break;
                }
            }
            k.Tila = latautuu ? OfflineTila.Latautuu : jonossa ? OfflineTila.Jonossa
                : valmiit == maat.Count ? OfflineTila.Valmis : virheet > 0 ? OfflineTila.Virhe : OfflineTila.Ei;
            return (k, valmiit > 0 && valmiit < maat.Count);
        }

        void OfflineToiminto(string id)
        {
            var palvelu = UiPalvelut.Offline;
            if (palvelu == null) return;
            List<OfflineMaa> maat = null;
            foreach (var (rid, _, l) in Ryhmat(palvelu.Maat)) if (rid == id) { maat = l; break; }
            if (maat == null) return;
            var k = Kooste(id, id, maat).Rivi;
            foreach (var m in maat)
            {
                switch (k.Tila)
                {
                    case OfflineTila.Jonossa:
                    case OfflineTila.Latautuu:
                        if (m.Tila == OfflineTila.Jonossa || m.Tila == OfflineTila.Latautuu) palvelu.Peru(m.Id);
                        break;
                    case OfflineTila.Valmis: palvelu.Poista(m.Id); break;
                    default: if (m.Tila != OfflineTila.Valmis) palvelu.Lataa(m.Id); break;
                }
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
