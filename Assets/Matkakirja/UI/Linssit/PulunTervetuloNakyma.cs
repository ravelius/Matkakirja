// PULUN TERVETULO ASTRONAUTIN KAMERAAN, Unity-kytkennät (Linssiseppä 29.9.2026; web js/linssit/pulu-tervetulo.js, PR #3575;
// logiikka Linssit/Ydin/Astronautti/PulunTervetulo.cs). Elää Pulun taulun mukana (PulunTauluNakyma): linssin avaus aloittaa,
// sulku purkaa, ja taulu avautuu itsestään heti paljastuksen jälkeen myös tervetulon aikana (omistaja 29.9.2026).
//
//   puhe      ILMAN KUPLAA (omistaja 29.9.2026, web sanoPulunIssRepliikkiIlmanKuplaa): Pulu ruudulla ja chatti kiinni, ele
//             tekstin sävystä (Pulu.RepliikinEle) ja ääni puhekanavalla (nokka liikkuu Aanet.PuluPuhuu-tilasta). Aanet.Soita
//             alkoi-kutsu = webin 'playing' (äänitteen pituus; null = ei soinut).
//   ohitus    napautus tai näppäin missä tahansa joka ruudussa (Pointer, Touchscreen ja Keyboard wasPressedThisFrame,
//             UiKerros.JokaRuutu), UI-kerrosten juurten kaappausvaihe ja pallon napautus taulun kautta (myös testikomento
//             ui napauta). Napautusta ei niele, joten taulun rivi, pallo ja ✕ saavat sen silti (webin kaappausvaiheen passiivinen
//             kuuntelija). Pulun napautus ohittaa myös taulun kautta (PulunTauluNakyma.Avaa, webin tervetulo.ohita).
//   muisti    PlayerPrefs "matkakirja-pulu-astro-tervetulo" (webin localStorage-avain).
//   mykistys  Kertoja-kytkin pois tai Pulun liuku 0 (web pulunIssMykistetty; Äänimaisema ei vaikuta Pulun puheeseen, Aanet.Taso):
//             ei aloiteta eikä muistia kuluteta, joten tervetulo tulee ensimmäisellä avauksella, jonka pelaaja kuulee.
//   luenta    kuvan selitettä ei lueta tervetulon päälle, kun jakso on kesken (odottaa tai puhuu; web #3609 tervetuloKesken):
//             Kuvanakyma.LuentaEste. Omistaja 8.9.2026: pulun ja kertojan äänet eivät saa mennä päällekkäin.
//   esilataus seuraava äänite haetaan muistiin edellisen aikana (ensimmäinen jo odotusvaiheessa).
// Testikomento `ui linssi tervetulo [tila|aloita|ohita|pura|nollaa]` (LinssiKomennot).
using System;
using System.Collections.Generic;
using Matkakirja.Linssit;
using Matkakirja.Linssit.Astronautti;
using UnityEngine;
using UnityEngine.InputSystem;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class PulunTervetuloNakyma : ITervetulonYmparisto
    {
        readonly UiKerros kerros;
        PulunTervetulo jakso;
        bool kuunnellaan;

        public PulunTervetuloNakyma(UiKerros kerros) { this.kerros = kerros; }

        /// <summary>Tämän avauksen jakso tai null (kuultu, mykistetty tai linssi kiinni).</summary>
        public PulunTervetulo Jakso => jakso;
        /// <summary>Jakso odottaa verhoa tai puhuu: Pulun taulun automaattinen avaus odottaa sitä.</summary>
        public bool Kesken => jakso != null && jakso.Kesken;
        /// <summary>Repliikki kesken (web liviaPuhuu: tervetulon oma tila).</summary>
        public bool Puhuu => jakso != null && jakso.Puhuu;

        static AstronauttiLinssi Linssi() => UnityEngine.Object.FindAnyObjectByType<AstronauttiKerros>()?.Linssi;

        /// <summary>Linssi avattiin: tervetulo, jos sen aika on.</summary>
        public void Aloita()
        {
            Pura();
            jakso = PulunTervetulo.Aloita(this);
            if (jakso == null) return;
            Esilataa(0);
            Kuuntele(true);
            Debug.Log("MATKAKIRJA pulun tervetulo alkaa: " + jakso);
        }

        /// <summary>Linssi suljettiin: puhe ja ajastimet pois (kamera ja kuva jäävät linssin purulle).</summary>
        public void Pura()
        {
            jakso?.Pura();
            Kuuntele(false);
        }

        /// <summary>Pulun taulun napautus ja testikomento (web tervetulo.ohita).</summary>
        public bool Ohita(string syy = "kutsu") => jakso != null && jakso.Ohita(syy);

        /// <summary>Pelaajan napautus (pallo taulun kautta, UI-kerrosten juuret): ohittaa vain puheen aikana.</summary>
        public void Napautus() => jakso?.Napautus();

        readonly List<VisualElement> juuret = new List<VisualElement>();

        void Kuuntele(bool paalla)
        {
            if (paalla == kuunnellaan) return;
            kuunnellaan = paalla;
            if (paalla)
            {
                kerros.JokaRuutu += Ruutu;
                // Myös UI:n kautta tulevat napautukset (kaappausvaiheessa, ei niele): testikomento ui napauta ja kosketukset
                // ruudun elementteihin samassa ruudussa kuin Input System näkee ne.
                foreach (var (_, j) in kerros.Juuret)
                    if (j != null && !juuret.Contains(j)) { juuret.Add(j); j.RegisterCallback<PointerDownEvent>(UiNapautus, TrickleDown.TrickleDown); }
            }
            else
            {
                kerros.JokaRuutu -= Ruutu;
                foreach (var j in juuret) j.UnregisterCallback<PointerDownEvent>(UiNapautus, TrickleDown.TrickleDown);
                juuret.Clear();
            }
            Kuvanakyma.LuentaEste = paalla ? () => jakso != null && jakso.Kesken : (Func<bool>)null;
        }

        void UiNapautus(PointerDownEvent e) => Napautus();

        void Ruutu()
        {
            if (jakso == null) { Kuuntele(false); return; }
            // Saman ruudun napautus ennen ajastimia (webissä tapahtuma ajetaan ennen seuraavaa ajastinta).
            if (UusiPainallus()) jakso.Napautus();
            jakso.Paivita();
            if (!jakso.Kesken)
            {
                Kuuntele(false);
                Debug.Log("MATKAKIRJA pulun tervetulo päättyi: " + jakso);
            }
        }

        static bool UusiPainallus()
        {
            var o = Pointer.current;
            if (o != null && o.press.wasPressedThisFrame) return true;
            var t = Touchscreen.current;
            if (t != null) foreach (var k in t.touches) if (k.press.wasPressedThisFrame) return true;
            var n = Keyboard.current;
            return n != null && n.anyKey.wasPressedThisFrame;
        }

        /// <summary>Jakson äänite muistiin ennen vuoroaan (Aanet.Hae).</summary>
        static void Esilataa(int i)
        {
            if (i >= 0 && i < PulunIss.Jakso.Count) Aanet.Hae(Aanet.Juuri + PulunIss.Jakso[i].Aani, _ => { });
        }

        // --- ympäristö -------------------------------------------------------------------------------------------------

        double ITervetulonYmparisto.Nyt => Time.unscaledTimeAsDouble * 1000.0;

        bool ITervetulonYmparisto.Paljastettu() => Linssi()?.Vaihe == AvauksenVaihe.Pois;

        bool ITervetulonYmparisto.Sano(IssRepliikki r, Action<double?> aaniAlkoi)
        {
            var pulu = Pulu.Hae();
            if (!pulu.Nakyvissa || (UiNakymat.Olemassa && UiNakymat.Hae().Chat?.Auki == true)) return false;
            // Ei kuplaa (omistaja 29.9.2026): taulu on auki, ja Pulu puhuu sen aikana.
            var ele = Pulu.RepliikinEle(r.Teksti);
            if (ele != "blink") pulu.Toista(ele, "speech");
            Aanet.Soita(AaniKanava.Puhe, Aanet.Juuri + r.Aani, klippi => aaniAlkoi(klippi != null ? klippi.length * 1000.0 : (double?)null));
            int i = 0;
            while (i < PulunIss.Jakso.Count && PulunIss.Jakso[i] != r) i++;
            Esilataa(i + 1);
            return true;
        }

        bool ITervetulonYmparisto.Mykistetty() => !Asetukset.Paalla(Kytkin.Kertoja) || !(Asetukset.Taso(Voima.Pulu) > 0f);

        void ITervetulonYmparisto.Vaikene()
        {
            Aanet.Pysayta(AaniKanava.Puhe);
            Pulu.Hae().Kuplat.TyhjennaKaikki();
        }

        bool ITervetulonYmparisto.Kuultu() => PlayerPrefs.GetInt(PulunIss.TalleAvain, 0) == 1;

        void ITervetulonYmparisto.MerkitseKuulluksi()
        {
            PlayerPrefs.SetInt(PulunIss.TalleAvain, 1);
            PlayerPrefs.Save();
        }

        // --- testikomento ---------------------------------------------------------------------------------------------

        /// <summary>
        /// `ui linssi tervetulo [tila|aloita|ohita|pura|nollaa]`: tila = jakso ja muisti, aloita = jakso uudelleen tälle avaukselle
        /// (muisti ensin pois), ohita = pelaajan napautuksen polku, pura = linssin sulun polku, nollaa = muisti pois (seuraava avaus
        /// kuulee tervetulon).
        /// </summary>
        public string Testaa(string a1)
        {
            switch (a1)
            {
                case "nollaa": PlayerPrefs.DeleteKey(PulunIss.TalleAvain); PlayerPrefs.Save(); break;
                case "aloita": PlayerPrefs.DeleteKey(PulunIss.TalleAvain); Aloita(); break;
                case "ohita": jakso?.Napautus(); break;
                case "pura": Pura(); break;
            }
            var muisti = PlayerPrefs.GetInt(PulunIss.TalleAvain, 0) == 1 ? "kuultu" : "ei kuultu";
            var m = ((ITervetulonYmparisto)this).Mykistetty() ? ", mykistetty" : "";
            return (jakso != null ? jakso.ToString() : "tervetulo ei alkanut") + $", muisti {muisti}{m}, "
                + $"puhuu {(Aanet.PuluPuhuu ? "kyllä" : "ei")}, kuplia {Pulu.Hae().Kuplat.Maara}, kuva {(Linssi()?.AvoinKuva?.Tunnus ?? "-")}";
        }
    }
}
