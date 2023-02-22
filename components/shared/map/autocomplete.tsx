import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
} from "@reach/combobox";
import { useLoadScript } from "@react-google-maps/api";
import usePlacesAutocomplete, {
    Suggestion,
} from "use-places-autocomplete";

type PlacesAutocompleteProps = {
    defaultValue?: string;
    setSelected?: (location: { lat?: number; lng?: number, address: string }) => void;
};






export const PlacesAutocomplete: React.FC<PlacesAutocompleteProps> = ({
    defaultValue,
    setSelected,
}) => {
    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete({
        defaultValue
    });

    const handleSelect = async (address: string) => {
        setValue(address, false);
        clearSuggestions();

        // const results = await getGeocode({ address });
        // const { lat, lng } = await getLatLng(results[0]);
        setSelected?.({ address});
    };

    return (
        <Combobox onSelect={handleSelect}>
            <ComboboxInput
                value={value}
                onChange={(e) => setValue(e.target.value)}
                disabled={!ready}
                className="w-full p-2 px-3 focus:outline-none rounded-md shadow shadow-sm bg-white"
                placeholder="Tìm kiếm..."
            />
            <ComboboxPopover className="p-0 m-0">
               
                    {status === "OK" && <ComboboxList className="w-full mt-1  divide-y divide-slate-200 overflow-hidden rounded-md m-0 p-0 text-gray-700 max-h-96 bg-white shadow shadow-sm">
                        {data?.map((suggestion: Suggestion) => (
                            <ComboboxOption
                                className="hover:text-gray-900 w-full p-2 px-3 hover:bg-gray-50 transition cursor-default"
                                key={suggestion.place_id}
                                value={suggestion.description}
                            />
                        ))}  </ComboboxList>}
               
            </ComboboxPopover>
        </Combobox>
    );
};


const libraries = ['places'];
export default function Places2(props: PlacesAutocompleteProps) {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
        libraries: libraries as any
    });
  
    if (!isLoaded) return <div>Loading...</div>;
    return <PlacesAutocomplete {...props} />;
  }
