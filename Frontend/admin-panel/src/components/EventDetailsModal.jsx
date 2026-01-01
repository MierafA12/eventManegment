import React from 'react';
import { FiX, FiCalendar, FiMapPin, FiUsers, FiTag, FiGlobe, FiImage } from 'react-icons/fi';

export default function EventDetailsModal({ event, onClose }) {
    if (!event) return null;

    const IMAGE_BASE_URL = "http://localhost/EthioEvents/Backend/public/uploads/events/";

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl animate-in fade-in zoom-in duration-300">

                {/* Header */}
                <div className="relative h-64 sm:h-80">
                    <img
                        src={event.image ? `${IMAGE_BASE_URL}${event.image}` : "/images/default-event.jpg"}
                        alt={event.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 bg-black/40 hover:bg-black/60 text-white rounded-full transition"
                    >
                        <FiX size={24} />
                    </button>

                    <div className="absolute bottom-6 left-6 right-6">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-2 ${event.eventType === "Physical"
                            ? "bg-blue-500 text-white"
                            : "bg-purple-500 text-white"
                            }`}>
                            {event.eventType}
                        </span>
                        <h2 className="text-3xl font-bold text-white shadow-sm">{event.title}</h2>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8 space-y-6">
                    {/* Info Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                            <FiCalendar className="text-primary dark:text-secondary shrink-0" size={24} />
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Date & Time</p>
                                <div className="font-semibold dark:text-gray-200">
                                    {new Date(event.event_date).toLocaleDateString()}
                                </div>
                                {event.event_time && (
                                    <div className="text-sm dark:text-gray-300">{event.event_time}</div>
                                )}
                            </div>
                        </div>

                        <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                            <FiMapPin className="text-primary dark:text-secondary shrink-0" size={24} />
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Location</p>
                                <div className="font-semibold dark:text-gray-200">{event.location}</div>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                            <FiTag className="text-primary dark:text-secondary shrink-0" size={24} />
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Price</p>
                                <div className="font-semibold dark:text-gray-200">
                                    {Number(event.fee) > 0 ? `${event.fee} ETB` : "Free"}
                                </div>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                            <FiUsers className="text-primary dark:text-secondary shrink-0" size={24} />
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Capacity</p>
                                <div className="font-semibold dark:text-gray-200">{event.capacity} Attendees</div>
                            </div>
                        </div>
                    </div>

                    {/* Organizer Info */}
                    <div className="p-4 border border-gray-100 dark:border-gray-700 rounded-xl">
                        <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Organizer</h3>
                        <p className="text-lg font-medium dark:text-gray-200">{event.organizer_name || "Unknown Organizer"}</p>
                    </div>

                    {/* Description */}
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                            About Event
                        </h3>
                        <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-700/30 p-4 rounded-xl">
                            {event.description}
                        </div>
                    </div>

                </div>

                {/* Footer */}
                <div className="p-6 border-t dark:border-gray-700 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-white font-medium rounded-lg transition"
                    >
                        Close
                    </button>
                </div>

            </div>
        </div>
    );
}
