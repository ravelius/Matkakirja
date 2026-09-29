// DIORAAMAN TUNNELMA: PÄIVÄ / HÄMÄRÄ (Olavinlinna, omistaja 29.9.2026 klo 21.4x Päätoimittajan kautta: "iltahämärä, jossa
// soihdut ovat päävalo"; Siirtoseppä). Oletus rakennus.json:n `tunnelma` ("paiva" | "hamara"), kehittäjä voi pakottaa
// ("poikki tunnelma paiva|hamara|auto", muistetaan laitteeseen). Hämärässä: kuoren ja tilojen hämäräatlakset (jos
// paketissa), tausta ja sumu illansiniseksi, aurinko ja taivas himmeiksi (DioraamaValot.Tunnelmakerroin: vesi ja
// figuurit tummuvat), linnut himmeiksi; soihtujen ja lyhtyjen pistevalot pysyvät ennallaan, joten ne ovat päävalo.
using System;
using Matkakirja.Linssit.Dioraama;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    public static class DioraamaTunnelma
    {
        const string Avain = "dioraama-tunnelma";
        public static readonly Color HamaraTausta = new Color(0.16f, 0.19f, 0.26f, 1f);
        public const float HamaraAurinko = 0.15f, HamaraTaivas = 0.35f, HamaraLinnut = 0.35f;

        /// <summary>Kehittäjän pakotus (null = rakennuksen oletus).</summary>
        public static bool? Pakotettu
        {
            get { int v = PlayerPrefs.GetInt(Avain, -1); return v < 0 ? (bool?)null : v == 1; }
            set { PlayerPrefs.SetInt(Avain, value.HasValue ? (value.Value ? 1 : 0) : -1); PlayerPrefs.Save(); Vaihtui?.Invoke(); }
        }

        public static event Action Vaihtui;

        public static bool Hamara(Rakennus r) => Pakotettu ?? string.Equals(r?.Tunnelma, "hamara", StringComparison.OrdinalIgnoreCase);
    }
}
