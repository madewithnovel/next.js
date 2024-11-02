import cx from 'clsx';
import { Form, FormControl, FormField, FormItem } from 'components/ui/form';
import { Select as ShadcnSelect, SelectContent, SelectItem, SelectTrigger, SelectValue } from 'components/ui/select';

export default function Select ({ options, className, form, name, ...props }) {
	return (
		<Form {...form}>
			<FormField
				control={form.control}
				name={name}
				render={({ field }) => (
					<FormItem key={field.value} {...props} className="w-full">
						<ShadcnSelect onValueChange={(value) => field.onChange(value)} value={field.value} name={field.name}>
							<FormControl>
								<SelectTrigger className={cx('select', className)}>
									<SelectValue placeholder={options[0].label}/>
								</SelectTrigger>
							</FormControl>
							<SelectContent>
								{options.map(option => (
									<SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
								))}
							</SelectContent>
						</ShadcnSelect>
					</FormItem>
				)}
			/>
		</Form>
	);
}
