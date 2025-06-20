type HabitProps = {
    name: string;
};

export default function Habit({ name }: HabitProps) {
    return (
        <div id={name}>
            <label>
            <input type="checkbox"></input>
            {name}
            </label>
        </div>
    );
}