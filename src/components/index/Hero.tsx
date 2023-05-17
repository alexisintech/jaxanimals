import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "~/components/ui/Select";
import { Input } from "../ui/Input";

export const Hero = () => {
  return (
    <main className="text-primary-content -mt-[4rem] grid h-screen place-items-center items-center bg-gradient-to-br from-primary to-secondary pt-20">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          Let's find your furbaby.
        </h1>

        {/* Lost or found */}

        <div className="grid">
          {/* Name */}
          <Input type="text" placeholder="Name" />

          {/* Color */}
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Color" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="black">Black</SelectItem>
                <SelectItem value="white">White</SelectItem>
                <SelectItem value="orange">Orange</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          {/* Sex */}
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Sex" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="unknown">Unknown</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          {/* Markings */}
          <input
            type="text"
            placeholder="Markings e.g. 'Spots', 'Black socks'"
            className="bg-base-100 flex h-10 rounded-md border px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
      </div>
    </main>
  );
};
